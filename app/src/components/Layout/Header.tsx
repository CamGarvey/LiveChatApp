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
  Center,
  Stack,
  MediaQuery,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import {
  Sun,
  MoonStars,
  UserCircle,
  Logout,
  Bell,
  Search,
  Menu2,
} from 'tabler-icons-react';
import {
  FriendStatus,
  useGetDataForHeaderLazyQuery,
} from '../../graphql/generated/graphql';
import UserSearchModal from '../UserSearchModal/UserSearchModal';
import Drawer from './Drawer';
import FriendRequest from './FriendRequest';

const Header = () => {
  const isLargerScreen = useMediaQuery('(min-width: 900px)');
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
    useAuth0();
  const [friendSearchOpen, setFriendSearchOpen] = useState(false);

  const [getData, { loading, data, error }] = useGetDataForHeaderLazyQuery();

  useEffect(() => {
    if (isAuthenticated) {
      getData();
    }
  }, [isAuthenticated, user, getData]);

  // Filtering on Request Received for Apollo cache to filter out once clicked action
  const receivedFriendRequests =
    data?.me?.receivedFriendRequests.filter(
      (x) => x.friendStatus === FriendStatus.RequestReceived
    ) ?? [];

  return (
    <>
      <Drawer
        isOpened={isDrawerOpened}
        onClose={() => setIsDrawerOpened(false)}
      />
      <MHeader height={70} p="md">
        <Group>
          <MediaQuery largerThan={'sm'} styles={{ display: 'none' }}>
            <ActionIcon onClick={() => setIsDrawerOpened(true)}>
              <Menu2 />
            </ActionIcon>
          </MediaQuery>
          <Title order={isLargerScreen ? 1 : 3}>Hams Chat</Title>
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
              <MediaQuery smallerThan={'xs'} styles={{ display: 'none' }}>
                <Group>
                  <Menu
                    size={'xl'}
                    control={
                      <ActionIcon>
                        <Bell />
                      </ActionIcon>
                    }
                  >
                    <Stack>
                      {receivedFriendRequests.length ? (
                        <>
                          <Center>
                            <Title order={6}>Friend Requests</Title>
                          </Center>
                          {receivedFriendRequests.map((request) => (
                            <FriendRequest key={request.id} {...request} />
                          ))}
                        </>
                      ) : (
                        <Center>
                          <Text>No notifications</Text>
                        </Center>
                      )}
                    </Stack>
                  </Menu>
                  <Input
                    icon={<Search />}
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
                      <Text>{data?.me.username}</Text>
                    </Menu.Item>
                    <Menu.Item icon={<Logout />} onClick={() => logout()}>
                      <Text>Logout</Text>
                    </Menu.Item>
                  </Menu>
                </Group>
              </MediaQuery>
            ) : (
              <Button loading={isLoading} onClick={() => loginWithRedirect()}>
                Login
              </Button>
            )}
          </Group>
        </Group>
      </MHeader>
    </>
  );
};

export default Header;
