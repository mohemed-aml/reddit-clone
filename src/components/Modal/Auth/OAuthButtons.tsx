// /src/components/Modal/Auth/OAuthButtons.tsx

import { FIREBASE_ERRORS } from "@/firebase/errors";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/clientApp';

const AuthInputs: React.FC = () => {
  const [ signInWithGoogle, googleUser, googleLoading, googleError ] = useSignInWithGoogle(auth);
  return (
    <Flex
      direction='column'
      width='100%'
      mb={4}
    >
      <Button variant={'oauth'} mb={2}>
        <svg fill="currentColor" height="20" icon-name="phone-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.368 0H4.625A1.627 1.627 0 0 0 3 1.625v16.743A1.634 1.634 0 0 0 4.632 20h10.736A1.633 1.633 0 0 0 17 18.368V1.632A1.634 1.634 0 0 0 15.368 0ZM4.625 1.25h10.743a.382.382 0 0 1 .382.382V15.75H4.25V1.625a.375.375 0 0 1 .375-.375Zm10.743 17.5H4.632a.382.382 0 0 1-.382-.382V17h11.5v1.368a.382.382 0 0 1-.382.382Zm-3.413-14.5H8V3h3.955v1.25Z"></path>
        </svg>
        <span className="flex-grow text-14 overflow-hidden overflow-ellipsis align-top">Continue with phone number</span>
      </Button>
      <Button variant={'oauth'} mb={2} isLoading={googleLoading} onClick={() => signInWithGoogle()}>
        <Image src='/images/googlelogo.png' height='20px' mr={4}/>
        <span className="flex-grow text-14 overflow-hidden overflow-ellipsis align-top">Continue with Google</span>
      </Button>
      <Button variant={'oauth'} mb={2}>
        <Image src='/images/applelogoblack.png' height='20px' mr={4}/>
        <span className="flex-grow text-14 overflow-hidden overflow-ellipsis align-top">Continue with Apple</span>
      </Button>
      <Text textAlign='center' color='red' fontSize='10pt'> {FIREBASE_ERRORS[googleError?.message as keyof typeof FIREBASE_ERRORS] || googleError?.message} </Text>
    </Flex>
  )
}
export default AuthInputs;