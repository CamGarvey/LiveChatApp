import { useAuth0 } from '@auth0/auth0-react';
import {
  Group,
  Input,
  Header as MantineHeader,
  MediaQuery,
  Burger,
  Button,
} from '@mantine/core';
import { Search } from 'tabler-icons-react';
import { FriendStatus } from '../../../graphql/generated/graphql';
import { useIsDrawerOpen, useToggleDrawer } from '../../store';
import { ChatInfo } from '../../../models';
import { useUserSearchModal } from '../../Modals/UserSearchModal';
import AnimatedTitle from './AnimatedTitle';
import ColorModeSwitcher from './ThemeToggler';
import NotificationMenu from './NotificationMenu';
import AccountMenu from './AccountMenu';
import { useUser } from '../../../context/UserContext';

const ICON_SIZE = 16;

type Props = {
  chat?: ChatInfo;
};

const Header = ({ chat }: Props) => {
  const { isLoading, logout } = useAuth0();
  const { user } = useUser();
  const openUserSearchModal = useUserSearchModal();
  const isDrawerOpen = useIsDrawerOpen();
  const toggleDrawer = useToggleDrawer();

  // Filtering on Request Received for Apollo cache to filter out once clicked action
  const receivedFriendRequests =
    user?.receivedFriendRequests.filter(
      (x) => x.friendStatus === FriendStatus.RequestReceived
    ) ?? [];

  return (
    <MantineHeader height={70} p="md">
      <Group spacing={3}>
        <Button onClick={() => logout()} />
        <MediaQuery largerThan={'sm'} styles={{ display: 'none' }}>
          <Burger
            opened={isDrawerOpen}
            onClick={() => {
              toggleDrawer();
            }}
          />
        </MediaQuery>
        <AnimatedTitle chat={chat} user={user} />
        <Group sx={{ height: '100%' }} px={20} position="apart" ml={'auto'}>
          <ColorModeSwitcher size={ICON_SIZE} />
          {user && (
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
                  username={user.username}
                  onLogoutClick={() => logout()}
                />
              </MediaQuery>
            </Group>
          )}
        </Group>
      </Group>
    </MantineHeader>
  );
};

export default Header;
