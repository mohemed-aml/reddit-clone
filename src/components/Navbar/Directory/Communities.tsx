// /src/components/Navbar/Directory/Communities.tsx

import CreateCommunityModal from "@/components/Modal/CreateCommunity/CreateCommunityModal";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, Icon, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";
import { TiHome } from 'react-icons/ti';

const Communities: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)}/>
      <MenuItem 
        width='100%'
        fontSize={10}
        _hover={{ bg: 'gray.100' }}
        onClick={() => setOpen(true)}
      >
      <Flex align='center'>
        <Icon as={ GrAdd } fontSize={20} mr={2}/>
        Create Community
      </Flex>
      </MenuItem>
    </>
  )
}
export default Communities;