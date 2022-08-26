import { ActionIcon, Menu } from '@mantine/core';
import { useUser } from 'context/UserContext';
import { Logout, UserCircle } from 'tabler-icons-react';

type Props = {
  onLogoutClick: () => void;
};

const AccountMenu = ({ onLogoutClick }: Props) => {
  const { user } = useUser();
  return (
    <Menu>
      <Menu.Target>
        <ActionIcon variant="default">
          <UserCircle size={16} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item icon={<UserCircle />}>{user.username}</Menu.Item>
        <Menu.Item icon={<Logout />} onClick={onLogoutClick}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AccountMenu;
