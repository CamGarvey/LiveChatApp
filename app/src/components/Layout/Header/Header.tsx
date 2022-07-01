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
} from '../../../graphql/generated/graphql';
import { useIsDrawerOpen, useToggleDrawer } from '../../store';
import FriendRequest from '../../shared/FriendRequest';
import { ChannelInfo, ModalType } from '../../../models';
import { AnimatePresence, motion } from 'framer-motion';
import { useUserSearchModal } from '../../Modals/UserSearchModal';
import { useUpdateChannelModal } from '../../Modals/UpdateChannelModal';
import AnimatedTitle from './AnimatedTitle';
import ColorModeSwitcher from './ThemeToggler';
import NotificationMenu from './NotificationMenu';
import AccountMenu from './AccountMenu';

const ICON_SIZE = 16;

type Props = {
  channel?: ChannelInfo;
};

const Header = ({ channel }: Props) => {
  const openUserSearchModal = useUserSearchModal();
  const isDrawerOpen = useIsDrawerOpen();
  const toggleDrawer = useToggleDrawer();
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
        <AnimatedTitle channel={channel} user={data?.me} />
        <Group sx={{ height: '100%' }} px={20} position="apart" ml={'auto'}>
          <ColorModeSwitcher size={ICON_SIZE} />
          {isAuthenticated ? (
            <Group>
              <NotificationMenu
                friendRequests={receivedFriendRequests}
                size={ICON_SIZE}
              />
              <MediaQuery smallerThan={'xs'} styles={{ display: 'none' }}>
                <Input
                  icon={<Search />}
                  placeholder="Find your friends!"
                  onClick={openUserSearchModal}
                />
              </MediaQuery>
              <MediaQuery smallerThan={'xs'} styles={{ display: 'none' }}>
                <AccountMenu
                  username={data?.me.username}
                  onLogoutClick={() => logout()}
                />
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
