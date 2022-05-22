import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import FriendSearchModal from '../FriendSearchModal/FriendSearchModal';
import { BsSearch } from 'react-icons/bs';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { useAuth0 } from '@auth0/auth0-react';

type Props = {};

const Header = (props: Props) => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
    useAuth0();
  const [friendSearchOpen, setFriendSearchOpen] = useState(false);

  return (
    <Flex
      bg="lightblue"
      paddingX="10"
      paddingY="5"
      alignSelf="center"
      alignItems="center"
    >
      <Heading size="lg">Hams Chat</Heading>
      <Box id="auth" marginLeft="auto">
        <Flex alignItems="center" gap="3">
          {isAuthenticated ? (
            <>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <BsSearch color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Find your friends!"
                  onClick={() => {
                    setFriendSearchOpen(true);
                  }}
                />
              </InputGroup>
              {friendSearchOpen && (
                <FriendSearchModal
                  isOpen={friendSearchOpen}
                  onClose={() => {
                    setFriendSearchOpen(false);
                  }}
                />
              )}
              <Menu>
                <MenuButton as={IconButton} icon={<MdOutlineAccountCircle />} />
                <MenuList>
                  <MenuItem>{user?.name}</MenuItem>
                  <MenuItem onClick={() => logout()}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <Button
              isLoading={isLoading}
              onClick={() => loginWithRedirect()}
              variant={'solid'}
              as="a"
            >
              Login
            </Button>
          )}
          <ColorModeSwitcher />
        </Flex>
      </Box>
    </Flex>
  );
};

export default Header;
