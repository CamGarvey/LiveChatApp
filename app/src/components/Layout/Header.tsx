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
  Transition,
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
  InfoCircle,
  Settings,
} from 'tabler-icons-react';
import {
  FriendStatus,
  useGetDataForHeaderLazyQuery,
  useUpdateChannelMutation,
} from '../../graphql/generated/graphql';
import { useIsDrawerOpen, useToggleDrawer } from '../store';
import FriendRequest from '../shared/FriendRequest';
import { ChannelInfo, ModalType } from '../../models';
import { AnimatePresence, motion } from 'framer-motion';
import { useUserSearchModal } from '../Modals/UserSearchModal';
import { useUpdateChannelModal } from '../Modals/UpdateChannelModal';

const ICON_SIZE = 16;
const TRANSITION_DURATION = 300;

type Props = {
  channel?: ChannelInfo;
};

const Header = ({ channel }: Props) => {
  const openUserSearchModal = useUserSearchModal();
  const isLargerScreen = useMediaQuery('(min-width: 993px)');
  const isSmallScreen = useMediaQuery('(max-width: 500px)');
  const isDrawerOpen = useIsDrawerOpen();
  const toggleDrawer = useToggleDrawer();
  const openChannelUpdate = useUpdateChannelModal();
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
          <Burger
            opened={isDrawerOpen}
            onClick={() => {
              toggleDrawer();
            }}
          />
        </MediaQuery>
        <AnimatePresence custom={isDrawerOpen} exitBeforeEnter>
          <motion.div
            key={isDrawerOpen ? 'ham' : 'channel'}
            initial={{ y: -200 }}
            animate={{ y: 0 }}
            exit={{ y: -200 }}
            style={{ margin: 0 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.2 }}
          >
            {isDrawerOpen || isLargerScreen ? (
              <Title order={isSmallScreen ? 3 : 2}>Ham's Chat</Title>
            ) : (
              <Group spacing={2}>
                <ActionIcon
                  size={'xs'}
                  color={'blue'}
                  onClick={() => openChannelUpdate({ channel })}
                >
                  <Settings />
                </ActionIcon>
                <Text>{channel?.name}</Text>
              </Group>
            )}
          </motion.div>
        </AnimatePresence>
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
