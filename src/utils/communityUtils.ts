// src/utils/communityUtils.ts
import { firestore } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import safeJsonStringify from "safe-json-stringify";
import { Community } from "@/atoms/communitiesAtom";

export async function getCommunityData(communityId: string): Promise<Community | null> {
  try {
    const communityDocRef = doc(firestore, 'communities', communityId);
    const communityDoc = await getDoc(communityDocRef);
    if (!communityDoc.exists()) {
      return null; // Return null if the community doesn't exist
    }
    return JSON.parse(safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() }));
  } catch (error) {
    console.error('Error fetching community data:', error);
    return null;
  }
}