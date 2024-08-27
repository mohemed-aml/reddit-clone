// src/app/r/[communityId]/page.tsx

import { Community } from "@/atoms/communitiesAtom";
import { firestore } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import safeJsonStringify from "safe-json-stringify";

type CommunityPageProps = {
  communityData: Community;
};

async function getCommunityData(communityId: string) {
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

const CommunityPage: React.FC<{ params: { communityId: string } }> = async ({ params }) => {
  const communityData = await getCommunityData(params.communityId);
  console.log("Community Data:", communityData)
  if (!communityData) {
    return (
      <div>
        <h1>Community Not Found</h1>
        <p>The community you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }
  return (
    <div>WELCOME TO {communityData.id}</div>
  );
};

export default CommunityPage;