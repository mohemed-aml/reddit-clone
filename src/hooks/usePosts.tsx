// src/hooks/usePosts.tsx
import { authModalState } from "@/atoms/AuthModalAtom";
import { collection, deleteDoc, doc, getDocs, query, where, writeBatch } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Community, communityState } from "../atoms/communitiesAtom";
import { Post, postState, PostVote } from "../atoms/postsAtom";
import { auth, firestore, storage } from "../firebase/clientApp";

const usePosts = (communityData?: Community) => {
  const [user, loadingUser] = useAuthState(auth);
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState("");
  const router = useRouter();
  const communityStateValue = useRecoilValue(communityState);

  const onVote = async (  
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    vote: number,
    communityId: string,
    postIdx?: number
  ) => {

    event.stopPropagation();
    // If user is not authenticated and tries to vote, then we prompt the user to login 
    if (!user?.uid) {
      return setAuthModalState({ open: true, view: "login" });
    }

    //grab the current vote count of the post, by destructuring it
    const { voteCount } = post;
    // const existingVote = post.currentUserVoteStatus;
    const existingVote = postStateValue.votedPosts.find((votedPost) => votedPost.postId === post.id);

    try {
      let voteChange = vote;
      const batch = writeBatch(firestore);
      // creating copies of state which can be modified and then used to update actual state
      let updatedPost = { ...post };
      let updatedPosts = [...postStateValue.posts];
      let updatedVotedPosts = [...postStateValue.votedPosts];

       // has this user voted on this post already?
      if (!existingVote) { // New vote
        const postVoteRef = doc(collection(firestore, "users", `${user.uid}/votedPosts`));
        const newVote: PostVote = {
          id: postVoteRef.id,
          postId: post.id,
          communityId,
          voteValue: vote,
        };
        batch.set(postVoteRef, newVote);
        updatedVotedPosts = [...updatedVotedPosts, newVote];
      }
      else { // Removing existing vote
        const postVoteRef = doc(firestore,"users",`${user.uid}/votedPosts/${existingVote.id}`);
        if (existingVote.voteValue === vote) { // Removing previous vote
          voteChange *= -1;
          updatedVotedPosts = updatedVotedPosts.filter((vote) => vote.id !== existingVote.id);
          batch.delete(postVoteRef);
        }
        else { // Flipping vote
          voteChange *= 2;
          const voteIdx = postStateValue.votedPosts.findIndex((vote) => vote.id === existingVote.id);
          if (voteIdx !== -1) { // Vote was found - findIndex returns -1 if not found
            updatedVotedPosts[voteIdx] = {
              ...existingVote,
              voteValue: vote,
            };
          }
          batch.update(postVoteRef, {voteValue: vote});
        }
      }
      updatedPost.voteCount = voteCount + voteChange;
      const postIdx = postStateValue.posts.findIndex((item) => item.id === post.id);
      updatedPosts[postIdx!] = updatedPost;
      setPostStateValue((prev) => ({
        ...prev,
        posts: updatedPosts,
        votedPosts: updatedVotedPosts,
        postsCache: {
          ...prev.postsCache,
          [communityId]: updatedPosts,
        },
        selectedPost: prev.selectedPost?.id === post.id 
          ? { ...updatedPost, postIdx }
          : prev.selectedPost,
      }));
      // Update database
      const postRef = doc(firestore, "posts", `${post.id}`);
      batch.update(postRef, { voteCount: voteCount + voteChange });
      await batch.commit();
    } catch (error) {
      console.log("onVote error", error);
    }
  };

  const onSelectPost = (post: Post, postIdx: number) => {
    setPostStateValue((prev) => ({
      ...prev,
      selectedPost: { ...post, postIdx },
    }));
    router.push(`/r/${post.communityId}/comments/${post.id}`);
  };

  const onDeletePost = async (post: Post): Promise<boolean> => {
    try {
      // if post has an image url, delete it from storage
      if (post.imageURL) {
        const imageRef = ref(storage, `posts/${post.id}/image`);
        await deleteObject(imageRef);
      }

      // delete post from posts collection
      const postDocRef = doc(firestore, "posts", post.id!);
      await deleteDoc(postDocRef);

      // Update post state
      setPostStateValue((prev) => ({
        ...prev,
        posts: prev.posts.filter((item) => item.id !== post.id),
        postsCache: {
          ...prev.postsCache,
          [post.communityId]: prev.postsCache[post.communityId]?.filter(
            (item) => item.id !== post.id
          ),
        },
      }));

      // Cloud Function will trigger on post delete to delete all comments with postId === post.id
      if (router) router.back();
      return true;
    } catch (error) {
      console.log("THERE WAS AN ERROR", error);
      return false;
    }
  };

  const getCommunityPostVotes = useCallback(async (communityId: string) => {
    const votedPostsQuery = query(
      collection(firestore, `users/${user?.uid}/votedPosts`),
      where("communityId", "==", communityId)
    );
    const postVoteDocs = await getDocs(votedPostsQuery);
    const votedPosts = postVoteDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPostStateValue((prev) => ({
      ...prev,
      votedPosts: votedPosts as PostVote[],
    }));
  }, [user?.uid, setPostStateValue]);

  useEffect(() => {
    if (!user?.uid || !communityStateValue.currentCommunity) return;
    getCommunityPostVotes(communityStateValue.currentCommunity.id);
  }, [user, communityStateValue.currentCommunity, getCommunityPostVotes]);

  // Clear the votes if user Logs out or if there is no authenticated user
  useEffect(() => {
    if (!user?.uid && !loadingUser) {
      setPostStateValue((prev) => ({
        ...prev,
        votedPosts: [],
      }));
    }
  }, [user, loadingUser, setPostStateValue]);

  return {
    postStateValue,
    setPostStateValue,
    onSelectPost,
    onDeletePost,
    loading,
    setLoading,
    onVote,
    error,
  };
};

export default usePosts;