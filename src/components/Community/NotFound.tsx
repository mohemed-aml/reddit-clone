// src/components/Community/NotFound.tsx
"use client"

import React from "react";
import { Button, Divider, Flex, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useRouter } from 'next/navigation';

const CommunityNotFound: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const router = useRouter();

  const onClose = () => {
    setIsOpen(false);
    router.push('/'); // Redirect to home page
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size='lg'>
      <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px)' />
      <ModalContent maxW='700px'>
        <ModalHeader fontSize={20} padding={3}>
          <Flex align='center'>
            <Icon as={IoIosInformationCircleOutline} color='black' mr={2} fontSize={35}/>
            Community not found
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody padding='10px 10px'>
          <Text fontSize={14}>
            There aren&apos;t any communities on Reddit with that name. Double-check the community name or try searching for similar communities.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Browse Other Communities</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
};
export default CommunityNotFound;
