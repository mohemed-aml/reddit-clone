// src/atoms/communitiesAtom.ts
import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: 'public' | 'restricted' | 'private';
  createdAt?: Timestamp;
  imageURL?: string;
}

export interface CommunitySnippet {
  communityId: string;
  isModerator?: boolean;
  imageUrl?: string;
}

interface CommunityState {
  mySnippets: CommunitySnippet[];
  currentCommunity?: Community;
  loadingCommunity: boolean;
  // visitedCommunities
}

const defaultCommunityState: CommunityState = {
  mySnippets: [],
  loadingCommunity: false,
};

export const communityState = atom<CommunityState>({
  key: 'communityState',
  default: defaultCommunityState,
});