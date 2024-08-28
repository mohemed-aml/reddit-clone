// src/components/Community/NotFound.tsx
"use client"
import { Community } from "@/atoms/communitiesAtom";
import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import React from "react";
import { FaReddit } from "react-icons/fa";

type HeaderProps = {
  communityData: Community;
};

const Header:React.FC<HeaderProps> = ({ communityData }) => {
  const isJoined = false; // read from communitySnippets
  return (
    <Flex direction='column' width='100%' height='146px'>
      <Box height='50%' bg='blue.400' />
      <Flex justify='center' bg='white' flexGrow={1}>
        <Flex width='95%' maxWidth='860px'>
          {/* Placeholder for Community Image */}
          {communityData.imageURL? (
            <Image />
          ): (
              <Icon as={FaReddit} background='white' fontSize={75} position='relative' top={-4} color='blue.500' border='4px solid white' borderRadius='100%'/>
          )}
          <Flex padding='10px 16px'>
            <Flex direction='column' mr={6}>
              <Text fontWeight={800} fontSize={20   }>{communityData.id}</Text>
              <Text fontWeight={600} fontSize={12} color='gray.400'>r/{communityData.id}</Text>
            </Flex>
            <Button
              variant={isJoined ? 'outline' : 'solid'}
              height='30px'
                pr={6}
                pl={6}
              onClick={()=>{}}
            >
              {isJoined ? 'Joined' : 'Join'}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
};
export default Header;
