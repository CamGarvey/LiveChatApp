import { Menu, Text } from '@mantine/core';
import { UserMinus } from 'tabler-icons-react';
import { useDeleteFriendMutation } from '../../../graphql/generated/graphql';

type Props = {
  user: {
    id: string;
  };
};

const FriendMenu = ({ user }: Props) => {
  const [deleteFriend] = useDeleteFriendMutation();
  return (
    <Menu>
      <Menu.Item
        icon={<UserMinus />}
        type="button"
        onClick={() => {
          deleteFriend({
            variables: {
              friendId: user.id,
            },
          });
        }}
      >
        <Text>Unfriend</Text>
      </Menu.Item>
    </Menu>
  );
};

export default FriendMenu;
