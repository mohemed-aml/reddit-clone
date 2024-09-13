// src/atoms/postsAtom.ts
import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export type Post = {
  id?: string;
  communityId: string;
  creatorId: string;
  creatorDisplayName: string;
  title: string;
  body: string;
  numberOfComments: number;
  voteCount: number;
  imageURL?: string;
  communityImageURL?: string;
  createdAt?: Timestamp;
  editedAt?: Timestamp;
  currentUserVoteStatus?: { id: string; voteValue: number };
  postIdx?: number;
};

export type PostVote = {
  id?: string;
  postId?: string;
  communityId: string;
  voteValue: number;
};

interface PostState {
  selectedPost: Post | null;
  posts: Post[];
  votedPosts: PostVote[];
  postsCache: { [key: string]: Post[] };
  postUpdateRequired: boolean;
}

export const defaultPostState: PostState = {
  selectedPost: null,
  posts: [],
  votedPosts: [],
  postsCache: {},
  postUpdateRequired: true,
};

export const postState = atom({
  key: "postState",
  default: defaultPostState,
});