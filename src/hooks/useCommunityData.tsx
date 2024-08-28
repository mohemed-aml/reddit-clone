// src/app/r/[communityId]/page.tsx
import { Community, CommunitySnippet, communityState } from "@/atoms/communitiesAtom";
import { auth, firestore } from "@/firebase/clientApp";
import { collection, getDocs } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
const useCommunityData = () => {
  const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState);
  const joinCommunity = (communityData: Community) => {};
  const leaveCommunity = (communityId: string) => {};
  
  const onJoinOrLeaveCommunity = (communityData: Community, isJoined: boolean) => {
    // is the user signed in?
      // if not open the auth modal to prompt them to sign in
    
    // are they already part of this community
    if (isJoined) {
      return leaveCommunity(communityData.id);
    }
    joinCommunity(communityData);
  };

  const [loading, setloading] = useState(false);
  const [error, setError] = useState('');
  const [user] = useAuthState(auth);

  const getMySnippets = useCallback(async () => {
    setloading(true);
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
    setloading(false)
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