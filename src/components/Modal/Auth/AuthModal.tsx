// /src/components/Modal/Auth/AuthModal.tsx
"use client"
import { authModalState } from "@/atoms/AuthModalAtom";
import { auth } from "@/firebase/clientApp";
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import ResetPassword from './ResetPassword';

const AuthModal: React.FC= () => {
  const[modalState, setModalState] = useRecoilState(authModalState);
  const[user, loading, error] = useAuthState(auth);
  
  const handleClose = useCallback(() => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  }, [setModalState]);
  
  useEffect(() => {
    if (user) handleClose();
  }, [user, handleClose]);

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign='center'>
            {modalState.view === 'login' && 'Login'}
            {modalState.view === 'signup' && 'Sign Up'}
            {modalState.view === 'resetPassword' && 'Reset Password'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
          >
            <Flex
              direction='column'
              align='center'    
              justify='center'
              width='70%'
              pb={6}
            >
              {modalState.view === 'login' || modalState.view === 'signup' ? (
                <>
                  <OAuthButtons />
                  <Text color='gray.500' fontWeight={700}>OR</Text>
                  <AuthInputs />
                  </>
              ) : <ResetPassword />}
              
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
export default AuthModal;