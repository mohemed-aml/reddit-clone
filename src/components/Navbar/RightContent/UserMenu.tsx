// /src/components/Navbar/RightContent/UserMenu.tsx
import { authModalState } from "@/atoms/AuthModalAtom";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, Icon, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { FaRedditSquare } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { MdOutlineLogin } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { auth } from '../../../firebase/clientApp';
import { communityState } from "@/atoms/communitiesAtom";

type UserMenuProps = {
  user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const setAuthModalState = useSetRecoilState(authModalState)
  const logout = async () => {
    await signOut(auth);
  }

  return (
    <Menu>
      <MenuButton cursor='pointer' padding='0px 6px' borderRadius={4} _hover={{ outline: '1px solid', outlineColor: 'gray.200'}}>
        <Flex align='center'>
          <Flex align='center'>
            {user ? (
              <>
                <Icon fontSize={28} mr={1} color='gray.300' as={FaRedditSquare}/>
                <Flex
                  direction='column'
                  display={{ base: 'none', lg: 'flex' }}
                  fontSize={12}
                  align='flex-start'
                  mr={4}
                >
                  <Text>
                    {user.displayName || user.email?.split('@')[0]}
                  </Text>
                  <Flex align='center'>
                    <Icon as={IoSparkles} color='brand.100' mr={1}/>
                    <Text color='gray.400'>1 karma</Text>
                  </Flex>
                </Flex>
              </>
            ) : <Icon as={VscAccount} fontSize={24} color='gray.400' mr={1}/>}
          </Flex> 
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            <MenuItem fontSize={12} fontWeight={700} _hover={{ bg: 'blue.500', color: 'white' }}>
              <Flex align='center'>
                <Icon as={CgProfile} fontSize={20} mr={2}/>
                Profile
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem fontSize={12} fontWeight={700} _hover={{ bg: 'blue.500', color: 'white' }} onClick={logout}>
              <Flex align='center'>
                <Icon as={MdOutlineLogin} fontSize={20} mr={2}/>
                Log Out
              </Flex>
            </MenuItem>
          </>
        ): (
        <MenuItem fontSize={12} fontWeight={700} _hover={{ bg: 'blue.500', color: 'white' }} onClick={() => setAuthModalState({ open: true, view: 'login' })}>
          <Flex align='center'>
            <Icon as={MdOutlineLogin} fontSize={20} mr={2}/>
            Log In/Sign Up
          </Flex>
        </MenuItem>)}
      </MenuList>
    </Menu>
  )
}
export default UserMenu;