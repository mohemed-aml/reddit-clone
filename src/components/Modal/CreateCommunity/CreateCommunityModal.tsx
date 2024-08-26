// /src/components/Navbar/Directory/CreateCommunityModal.tsx

import { Text, Box, Button, Divider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Input, Stack, Flex, RadioGroup, Radio, Icon, Switch } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";

type CreateCommunityModalProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  handleClose,
}) => {
  const[communityName, setCommunityName] = useState('');
  const[nameCharCount, setNameCharCount] = useState(0);

  // const[communityDescription, setCommunityDescription] = useState('');
  // const[descriptionCharCount, setDescriptionCharCount] = useState(0);

  const[communityType, setCommunityType] = useState('public');
  const handleNameChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;
    setCommunityName(event.target.value);
    setNameCharCount(event.target.value.length);
  };

  return (
    <Modal isOpen={open} onClose={handleClose} size='lg'>
      <ModalOverlay />
      <ModalContent maxW='700px'>
        <ModalHeader
          display='flex'
          flexDirection='column'
          fontSize={24}
          padding={3}
        >
          Tell us about your community
          <Text fontSize={11} color='gray.500'>
          A name and description help people understand what your community is all about
          </Text>
        </ModalHeader>
        <ModalCloseButton />
          <Box pl={3} pr={3}>
            <Divider />
            <ModalCloseButton />
            <ModalBody
              display='flex'
              flexDirection='column'
              padding='10px 0px'
            >
              <Text fontWeight={600} fontSize={15}>
                Community name
              </Text>
              <Text fontSize={11} color='gray.500'>
                Community names including capitalization cannot be changed
              </Text>
              <Text
                position='relative'
                top='27px'
                left='10px'
                width='20px'
                color='gray.400'
              >
                r/
              </Text>
              <Input
                position='relative'
                value={communityName}
                size='sm'
                pl={25}
                onChange={handleNameChange}
              />
              <Text textAlign='right' fontSize='9pt' color={nameCharCount >= 21 ? 'red' : 'gray.500'}>{nameCharCount}/21</Text>
              <Box>
                <Text fontWeight={600} fontSize={15}>Community Type</Text>
                <RadioGroup onChange={setCommunityType} value={communityType} mt={2} mb={2}>
                  <Stack direction='column' gap={0}>
                    <Flex
                      display='flex'
                      justifyContent='space-between'
                      padding={5}
                      alignItems='center'
                      _hover={{
                        bg: 'gray.50',
                      }}
                      // onClick={() => signInWithGoogle()} 
                      >
                      <Flex display='flex' alignItems='center'>
                        <Icon as={BsFillPersonFill} color='black' mr={2}/>
                        <Text fontSize='14px' mr={1}>Public</Text>
                        <Text fontSize='12px' color='gray.500'>Anyone can view and contribute</Text>
                      </Flex>
                      <Radio value='public'></Radio>
                    </Flex>
                    <Flex
                      display='flex'
                      justifyContent='space-between'
                      padding={5}
                      alignItems='center'
                      _hover={{
                        bg: 'gray.50',
                      }} >
                      <Flex display='flex' alignItems='center'>
                        <Icon as={BsFillEyeFill} color='black' mr={2}/>
                        <Text fontSize='14px' mr={1}>Restricted</Text>
                        <Text fontSize='12px' color='gray.500'>Anyone can view, but only approved users can contribute</Text>
                      </Flex>
                      <Radio variant='black' value='restricted' ></Radio>
                    </Flex>
                    <Flex
                      display='flex'
                      justifyContent='space-between'
                      padding={5}
                      alignItems='center'
                      _hover={{
                        bg: 'gray.50',
                      }} >
                      <Flex display='flex' alignItems='center'>
                        <Icon as={HiLockClosed} color='black' mr={2}/>
                        <Text fontSize='14px' mr={1}>Private</Text>
                        <Text fontSize='12px' color='gray.500'>Only approved users can view and contribute</Text>
                      </Flex>
                      <Radio variant='black' value='private' ></Radio>
                    </Flex>
                  </Stack>
                </RadioGroup>
                <Divider colorScheme="gray"/>
                <Flex
                      display='flex'
                      justifyContent='space-between'
                      padding={5}
                      alignItems='center'
                      _hover={{
                        bg: 'gray.50',
                      }} >
                      <Flex display='flex' alignItems='center'>
                        <svg fill="currentColor" height="20" icon-name="nsfw-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                          <path d="m4.47 7.123 2.653-1.26h.47V14.5H6.15V7.668l-1.68.8V7.123Zm9.9 3.69a2.288 2.288 0 0 1-.02 2.54 2.7 2.7 0 0 1-1.085.91 3.699 3.699 0 0 1-3.068 0A2.774 2.774 0 0 1 9.1 13.35a2.253 2.253 0 0 1-.019-2.532c.257-.383.61-.69 1.025-.893A2.372 2.372 0 0 1 9.4 9.11a2.21 2.21 0 0 1-.257-1.048 2.1 2.1 0 0 1 .342-1.175c.233-.353.557-.637.938-.82.409-.202.86-.305 1.315-.3.451-.005.897.098 1.3.3.377.185.697.468.926.82.227.352.345.762.34 1.18a2.2 2.2 0 0 1-.255 1.05 2.3 2.3 0 0 1-.706.8c.415.202.77.512 1.026.896ZM12.54 13.2c.235-.11.437-.28.583-.495.142-.207.216-.454.214-.705a1.267 1.267 0 0 0-.205-.7 1.468 1.468 0 0 0-.57-.51 1.776 1.776 0 0 0-.83-.19c-.29-.004-.577.061-.836.19a1.5 1.5 0 0 0-.583.513 1.262 1.262 0 0 0 .003 1.4c.147.216.348.388.583.5.256.124.537.186.821.182a1.86 1.86 0 0 0 .82-.185Zm-1.474-6.083a1.194 1.194 0 0 0-.468.422 1.11 1.11 0 0 0-.173.615c-.002.224.058.444.173.636.113.192.275.35.468.46.201.114.429.173.66.17.23.002.456-.055.656-.167a1.233 1.233 0 0 0 .638-1.099 1.132 1.132 0 0 0-.635-1.037 1.507 1.507 0 0 0-1.319 0ZM10 19.988a4.616 4.616 0 0 1-3.27-1.352l-5.366-5.365a4.627 4.627 0 0 1 0-6.542L6.73 1.364a4.634 4.634 0 0 1 6.542 0l5.366 5.365a4.634 4.634 0 0 1 0 6.542l-5.366 5.365a4.615 4.615 0 0 1-3.27 1.352Zm0-18.726a3.362 3.362 0 0 0-2.386.987L2.25 7.614a3.374 3.374 0 0 0 0 4.772l5.366 5.365a3.38 3.38 0 0 0 4.773 0l5.365-5.365a3.375 3.375 0 0 0 0-4.772L12.387 2.25A3.364 3.364 0 0 0 10 1.262Z"></path>
                        </svg>
                        <Text fontSize='14px' ml={2}  mr={1}>Mature (18+)</Text>
                        <Text fontSize='12px' color='gray.500'>Users must be over 18 to view and contribute</Text>
                      </Flex>
                      <Switch size='lg' />
                    </Flex>
              </Box>
            </ModalBody>
          </Box>
          
        <ModalFooter display='flex' flexDirection='column'>
          <Text fontSize='13px' color='gray.500'>By continuing, you agree to our <a href="https://www.redditinc.com/policies/moderator-code-of-conduct" style={{ color:'#21272A', textDecoration: 'underline' }}>Mod Code of Conduct</a> of Conduct and acknowledge that you understand the <a href="https://www.redditinc.com/policies/content-policy" style={{ color:'#21272A', textDecoration: 'underline' }}>Reddit Content Policy</a></Text>
          <Flex display='flex' justifyContent='space-between' width='100%' mt={2}>
            <Box></Box>
            <Flex>
              <Button variant='outline' mr={3} onClick={handleClose}>Cancel</Button>
              <Button variant='solid'>Create Community</Button>
            </Flex>
          </Flex>
          
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
export default CreateCommunityModal;