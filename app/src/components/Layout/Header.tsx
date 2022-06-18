import { useAuth0 } from '@auth0/auth0-react';
import {
  Group,
  Title,
  ActionIcon,
  Input,
  Button,
  Header as MantineHeader,
  Menu,
  useMantineColorScheme,
  Text,
  Center,
  Stack,
  MediaQuery,
  Burger,
  Indicator,
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
} from 'tabler-icons-react';
import {
  FriendStatus,
  useGetDataForHeaderLazyQuery,
} from '../../graphql/generated/graphql';
import ModalType from '../../models/modal-type';
import { useIsDrawerOpen, useOpenModal, useToggleDrawer } from '../store';
import FriendRequest from './FriendRequest';

const ICON_SIZE = 16;

const Header = () => {
  const openUserSearchModal = useOpenModal(ModalType.UserSeach);
  const isLargerScreen = useMediaQuery('(min-width: 900px)');
  const isSmallScreen = useMediaQuery('(max-width: 500px)');
  const isDrawerOpen = useIsDrawerOpen();
  const toggleDrawer = useToggleDrawer();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
    useAuth0();

  const [getData, { data }] = useGetDataForHeaderLazyQuery();

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
    <MantineHeader height={70} p="md">
      <Group spacing={3}>
        <MediaQuery largerThan={'sm'} styles={{ display: 'none' }}>
          <Burger opened={isDrawerOpen} onClick={toggleDrawer} />
        </MediaQuery>
        <Title
          order={isLargerScreen ? 1 : 3}
          ml={isSmallScreen ? 'auto' : 'none'}
        >
          Hams Chat
        </Title>
        <Group sx={{ height: '100%' }} px={20} position="apart" ml={'auto'}>
          <ActionIcon variant={'default'} onClick={() => toggleColorScheme()}>
            {colorScheme === 'dark' ? (
              <Sun size={ICON_SIZE} />
            ) : (
              <MoonStars size={ICON_SIZE} />
            )}
          </ActionIcon>
          {isAuthenticated ? (
            <Group>
              <Menu
                size={'xl'}
                control={
                  <Indicator color={'red'} disabled>
                    <ActionIcon variant="default">
                      <Bell size={ICON_SIZE} />
                    </ActionIcon>
                  </Indicator>
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
              <MediaQuery smallerThan={'xs'} styles={{ display: 'none' }}>
                <Input
                  icon={<Search />}
                  placeholder="Find your friends!"
                  onClick={openUserSearchModal}
                />
              </MediaQuery>
              <MediaQuery smallerThan={'xs'} styles={{ display: 'none' }}>
                <Menu>
                  <Menu.Item icon={<UserCircle />}>
                    <Text>{data?.me.username}</Text>
                  </Menu.Item>
                  <Menu.Item icon={<Logout />} onClick={() => logout()}>
                    <Text>Logout</Text>
                  </Menu.Item>
                </Menu>
              </MediaQuery>
            </Group>
          ) : (
            <Button loading={isLoading} onClick={() => loginWithRedirect()}>
              Login
            </Button>
          )}
        </Group>
      </Group>
    </MantineHeader>
  );
};

export default Header;
