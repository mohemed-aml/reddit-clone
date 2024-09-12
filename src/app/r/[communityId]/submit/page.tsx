// /src/api/r/[communityId]/submit/page .tsx
'use client'
import PageContent from "@/components/Layout/PageContent";
import { Box, Text } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import About from "@/components/Community/About";
import NewPostForm from "@/components/Posts/NewPostForm";
import { auth } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";

const CreateCommmunityPostPage: React.FC = () => {
  const [user, loadingUser] = useAuthState(auth);
  const router = useRouter();
  const { communityId } = useParams();
  const { communityStateValue, loading, error } = useCommunityData(communityId as string);

  useEffect(() => {
    if (!user && !loadingUser && !loading && communityStateValue.currentCommunity) {
      router.push(`/r/${communityStateValue.currentCommunity.id}`);
    }
  }, [user, loadingUser, loading, communityStateValue.currentCommunity, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <PageContent>
      <>
        {user && communityStateValue.currentCommunity && (
          <>
            <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
              <Text fontWeight={600}>Create a post</Text>
            </Box>
            <NewPostForm
              user={user}
            />
          </>
        )}
      </>
      {communityStateValue.currentCommunity && (
        <>
          <About communityData={communityStateValue.currentCommunity} pt={6} onCreatePage={true} loading={loading}/>
        </>
      )}
    </PageContent>
  );
};

export default CreateCommmunityPostPage;