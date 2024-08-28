// src/app/r/[communityId]/page.tsx
import { Community } from "@/atoms/communitiesAtom";
import Header from "@/components/Community/Header";
import NotFound from "@/components/Community/NotFound";
import PageContent from "@/components/Layout/PageContent";
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
  if (!communityData) {
    return (
      <NotFound />  
    );
  }
  return (
    <>
     <Header communityData={communityData} />
     <PageContent>
      <><div>LHS</div></>
      <><div>RHS</div></>
     </PageContent>
    </>
  );
};
export default CommunityPage;