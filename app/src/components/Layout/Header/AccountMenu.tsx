import { ActionIcon, Menu, Text } from '@mantine/core';
import { Logout, UserCircle } from 'tabler-icons-react';

type Props = {
  username: string;
  onLogoutClick: () => void;
};

const AccountMenu = ({ username, onLogoutClick }: Props) => {
  return (
    <Menu>
      <Menu.Target>
        <ActionIcon variant="default">
          <UserCircle size={16} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item icon={<UserCircle />}>{username}</Menu.Item>
        <Menu.Item icon={<Logout />} onClick={onLogoutClick}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AccountMenu;
