// src/app/r/[communityId]/page.tsx
"use client";
import About from "@/components/Community/About";
import CreatePostLink from "@/components/Community/CreatePostLink";
import Header from "@/components/Community/Header";
import NotFound from "@/components/Community/NotFound";
import PageContent from "@/components/Layout/PageContent";
import Posts from "@/components/Posts/Posts";
import useCommunityData from "@/hooks/useCommunityData";
import React from "react";

const CommunityPage: React.FC<{ params: { communityId: string } }> = ({ params }) => {
  const { communityData, loading } = useCommunityData(params.communityId);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!communityData) {
    return <NotFound />
  }

  return (
    <>
     <Header communityData={communityData} />
     <PageContent>
      <>
        <CreatePostLink />
        <Posts communityData={communityData} />
      </>
      <>
        <About communityData={communityData} pt={2} onCreatePage={false} loading={false}/>
      </>
     </PageContent>
    </>
  );
};
export default CommunityPage;