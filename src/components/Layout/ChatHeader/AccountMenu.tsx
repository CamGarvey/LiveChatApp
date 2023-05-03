import { ActionIcon, Menu } from '@mantine/core';
import { IconLogout, IconUserCircle } from '@tabler/icons-react';
import { UserAvatar } from 'components/shared/Avatars';
import { useUser } from 'context/UserContext';

type Props = {
  onLogoutClick: () => void;
};

const AccountMenu = ({ onLogoutClick }: Props) => {
  const { user, loading } = useUser();

  return (
    <Menu>
      <Menu.Target>
        <ActionIcon
          loading={loading}
          variant="default"
          sx={{
            border: 'none',
            background: 'transparent',
            ':active': {
              background: 'transparent',
            },
            ':hover': {
              background: 'transparent',
            },
          }}
        >
          <UserAvatar user={user} loading={loading} dropdown={{ style: { display: 'none' } }} />
        </ActionIcon>
      </Menu.Target>
      {user && (
        <Menu.Dropdown>
          <Menu.Item icon={<IconUserCircle />}>{user.username}</Menu.Item>
          <Menu.Item icon={<IconLogout />} onClick={onLogoutClick}>
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      )}
    </Menu>
  );
};

export default AccountMenu;
