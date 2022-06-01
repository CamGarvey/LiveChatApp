import { useAuth0 } from '@auth0/auth0-react';
import {
  Group,
  Title,
  ActionIcon,
  Input,
  Button,
  Header as MHeader,
  Menu,
  useMantineColorScheme,
  Text,
} from '@mantine/core';
import React, { useState } from 'react';
import { Sun, MoonStars, UserCircle, Logout } from 'tabler-icons-react';
import UserSearchModal from '../UserSearchModal/UserSearchModal';

type Props = {};

const Header = (props: Props) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
    useAuth0();
  const [friendSearchOpen, setFriendSearchOpen] = useState(false);

  return (
    <MHeader height={70} p="md">
      <Group>
        <Title>Hams Chat</Title>
        <Group sx={{ height: '100%' }} px={20} position="apart" ml={'auto'}>
          <ActionIcon
            variant="default"
            onClick={() => toggleColorScheme()}
            size={30}
          >
            {colorScheme === 'dark' ? (
              <Sun size={16} />
            ) : (
              <MoonStars size={16} />
            )}
          </ActionIcon>
          {isAuthenticated ? (
            <Group>
              <Input
                icon={''}
                placeholder="Find your friends!"
                onClick={() => {
                  setFriendSearchOpen(true);
                }}
              />
              {friendSearchOpen && (
                <UserSearchModal
                  isOpen={friendSearchOpen}
                  onClose={() => {
                    setFriendSearchOpen(false);
                  }}
                />
              )}
              <Menu>
                <Menu.Item icon={<UserCircle />}>
                  <Text>{user?.name}</Text>
                </Menu.Item>
                <Menu.Item icon={<Logout />} onClick={() => logout()}>
                  <Text>Logout</Text>
                </Menu.Item>
              </Menu>
            </Group>
          ) : (
            <Button
              loading={isLoading}
              onClick={() => loginWithRedirect()}
              // variant={'solid'}
              // as="a"
            >
              Login
            </Button>
          )}
        </Group>
      </Group>
    </MHeader>
  );
};

export default Header;
