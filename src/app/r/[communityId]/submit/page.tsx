// /src/api/r/[communityId]/submit/page .tsx
'use client'
import PageContent from "@/components/Layout/PageContent";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { NextPage } from "next";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";
import { communityState } from "@/atoms/communitiesAtom";
// import About from "@/components/Community/About";
import NewPostForm from "@/components/Posts/NewPostForm";
import { auth } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";

const CreateCommmunityPostPage: React.FC = () => {
  const [user, loadingUser, error] = useAuthState(auth);
  const router = useRouter();
  const params = useParams();
  const community = params.communityId;
  // const visitedCommunities = useRecoilValue(communityState).visitedCommunities;
  const communityStateValue = useRecoilValue(communityState);
  const { loading } = useCommunityData();
  /**
   * Not sure why not working
   * Attempting to redirect user if not authenticated
   */
  // useEffect(() => {
  //   if (!user && !loadingUser && communityStateValue.currentCommunity.id) {
  //     router.push(`/r/${communityStateValue.currentCommunity.id}`);
  //   }
  // }, [user, loadingUser, communityStateValue.currentCommunity]);

  return (
    <PageContent>
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text fontWeight={600}>Create a post</Text>
        </Box>
        
        {user && (
          <NewPostForm
            // communityId={communityStateValue.currentCommunity.id}
            // communityImageURL={communityStateValue.currentCommunity.imageURL}
            user={user}
          />
        )}
      </>
      <>Hello</>
      {/* {communityStateValue.currentCommunity && (
        <>
          <About
            communityData={communityStateValue.currentCommunity}
            pt={6}
            onCreatePage
            loading={loading}
          />
        </>
      )} */}
    </PageContent>
  );
};

export default CreateCommmunityPostPage;




// const CreateCommmunityPostPage: NextPage = () => {
//   const [user, loadingUser, error] = useAuthState(auth);
//   const router = useRouter();
//   const { community } = router.query;
//   // const visitedCommunities = useRecoilValue(communityState).visitedCommunities;
//   const communityStateValue = useRecoilValue(communityState);
//   const { loading } = useCommunityData();

//   /**
//    * Not sure why not working
//    * Attempting to redirect user if not authenticated
//    */
//   useEffect(() => {
//     if (!user && !loadingUser && communityStateValue.currentCommunity.id) {
//       router.push(`/r/${communityStateValue.currentCommunity.id}`);
//     }
//   }, [user, loadingUser, communityStateValue.currentCommunity]);

//   console.log("HERE IS USER", user, loadingUser);

//   return (
//     <PageContentLayout maxWidth="1060px">
//       <>
//         <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
//           <Text fontWeight={600}>Create a post</Text>
//         </Box>
//         {user && (
//           <NewPostForm
//             communityId={communityStateValue.currentCommunity.id}
//             communityImageURL={communityStateValue.currentCommunity.imageURL}
//             user={user}
//           />
//         )}
//       </>
//       {communityStateValue.currentCommunity && (
//         <>
//           <About
//             communityData={communityStateValue.currentCommunity}
//             pt={6}
//             onCreatePage
//             loading={loading}
//           />
//         </>
//       )}
//     </PageContentLayout>
//   );
// };

// export default CreateCommmunityPostPage;