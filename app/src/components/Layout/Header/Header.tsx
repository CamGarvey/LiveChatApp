import { useAuth0 } from '@auth0/auth0-react';
import {
  Group,
  Input,
  Header as MantineHeader,
  MediaQuery,
  Burger,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import { useDrawer } from 'store';
import { useUserSearchModal } from 'components/Modals/UserSearchModal/UserSearchModal';
import AnimatedTitle from './AnimatedTitle';
import ColorModeSwitcher from './ThemeToggler';
import NotificationMenu from './NotificationMenu/NotificationMenu';
import AccountMenu from './AccountMenu';
import { useUser } from 'context/UserContext';
import UserSearchBar from './UserSearchBar';

const ICON_SIZE = 16;

const Header = () => {
  const { logout } = useAuth0();
  const { user } = useUser();

  const drawer = useDrawer();

  return (
    <MantineHeader
      height={70}
      p="md"
      sx={{
        zIndex: 101,
      }}
    >
      <Group spacing={3}>
        <MediaQuery largerThan={'sm'} styles={{ display: 'none' }}>
          <Burger
            opened={drawer.isOpen}
            onClick={() => {
              drawer.toggle();
            }}
          />
        </MediaQuery>
        <AnimatedTitle />
        <Group sx={{ height: '100%' }} px={20} position="apart" ml={'auto'}>
          <ColorModeSwitcher size={ICON_SIZE} />
          {user && (
            <Group>
              <NotificationMenu size={ICON_SIZE} />
              <MediaQuery smallerThan={'xs'} styles={{ display: 'none' }}>
                <UserSearchBar />
              </MediaQuery>
              <MediaQuery smallerThan={'xs'} styles={{ display: 'none' }}>
                <AccountMenu onLogoutClick={() => logout()} />
              </MediaQuery>
            </Group>
          )}
        </Group>
      </Group>
    </MantineHeader>
  );
};

export default Header;
