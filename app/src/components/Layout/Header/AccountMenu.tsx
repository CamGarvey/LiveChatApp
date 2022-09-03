import { gql } from '@apollo/client';
import { ActionIcon, Menu } from '@mantine/core';
import UserAvatar from 'components/shared/UserAvatar';
import { useUser } from 'context/UserContext';
import { useGetMeForAccountMenuQuery } from 'graphql/generated/graphql';
import { IconLogout, IconUserCircle } from '@tabler/icons';

gql`
  query GetMeForAccountMenu {
    me {
      ...UserAvatar
    }
  }
  ${UserAvatar.fragments.user}
`;

type Props = {
  onLogoutClick: () => void;
};

const AccountMenu = ({ onLogoutClick }: Props) => {
  const { data, loading } = useGetMeForAccountMenuQuery();

  const user = data?.me;

  return (
    <Menu>
      <Menu.Target>
        <ActionIcon loading={loading} variant="default">
          <UserAvatar user={user} tooltip={{ hidden: true }} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item icon={<IconUserCircle />}>{user.username}</Menu.Item>
        <Menu.Item icon={<IconLogout />} onClick={onLogoutClick}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AccountMenu;
