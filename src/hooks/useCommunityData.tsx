// src/app/r/[communityId]/page.tsx
import { authModalState } from "@/atoms/AuthModalAtom";
import { Community, CommunitySnippet, communityState } from "@/atoms/communitiesAtom";
import { auth, firestore } from "@/firebase/clientApp";
import { collection, doc, getDocs, increment, writeBatch } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const setAuthModalState = useSetRecoilState(authModalState);
  const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState);
  const joinCommunity = async (communityData: Community) => {
    setLoading(true)
    try {
      // creating and adding a new communitySnippet to user
      const batch = writeBatch(firestore);
      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        imageUrl: communityData.imageURL || "",
      };
      batch.set(doc(firestore, `users/${user?.uid}/communitySnippets`, communityData.id), newSnippet);

      // updating the number of members on this community
      batch.update(doc(firestore, 'communities', communityData.id), {
        numberOfMembers: increment(1),
      });
      await batch.commit();

      // update recoil state - communityState.mySnippets
      setCommunityStateValue(prev => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));

    } catch (error: any) {
      console.log('Community Join Error', error);
      setError(error.message);
    }
    setLoading(false)
  };
  const leaveCommunity = async (communityId: string) => {
    setLoading(true)
    try {
      // delelting communitySnippet from user
      const batch = writeBatch(firestore);
      batch.delete(doc(firestore, `users/${user?.uid}/communitySnippets`, communityId));

      // updating the number of members on this community
      batch.update(doc(firestore, 'communities', communityId), {
        numberOfMembers: increment(-1),
      });
      await batch.commit();

      // update recoil state - communityState.mySnippets
      setCommunityStateValue(prev => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(item => item.communityId !== communityId),
      }));

    } catch (error: any) {
      console.log('Leave Community Error', error);
      setError(error.message);
    }
    setLoading(false)
  };
  
  const onJoinOrLeaveCommunity = (communityData: Community, isJoined: boolean) => {
    // if user is not signed in, open the auth modal to prompt them to sign in
    if (!user) {
      // open modal
      return setAuthModalState({ open: true, view: 'login' });
    }
    
    // are they already part of this community
    if (isJoined) {
      return leaveCommunity(communityData.id);
    }
    joinCommunity(communityData);
  };
  
  const getMySnippets = useCallback(async () => {
    setLoading(true);
    try {
      const snippetDocs = await getDocs(collection(firestore, `users/${user?.uid}/communitySnippets`)); 
      const snippets = snippetDocs.docs.map(doc => ({ ...doc.data() }));
      setCommunityStateValue(prev => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
      }));
    } catch (error) {
      console.log('getMySnippet Error', error)
    }
    setLoading(false)
  }, [user, setCommunityStateValue]);

  useEffect(() => {
    if(!user) return;
    getMySnippets();
  }, [user, getMySnippets]);

  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  };
};
export default useCommunityData;