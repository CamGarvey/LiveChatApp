import { Menu, Text } from '@mantine/core';
import { Logout, UserCircle } from 'tabler-icons-react';

type Props = {
  username: string;
  onLogoutClick: () => void;
};

const AccountMenu = ({ username, onLogoutClick }: Props) => {
  return (
    <Menu>
      <Menu.Item icon={<UserCircle />}>
        <Text>{username}</Text>
      </Menu.Item>
      <Menu.Item icon={<Logout />} onClick={onLogoutClick}>
        <Text>Logout</Text>
      </Menu.Item>
    </Menu>
  );
};

export default AccountMenu;
