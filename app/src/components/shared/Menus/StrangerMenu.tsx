import { ActionIcon, Menu } from '@mantine/core';
import { UserPlus } from 'tabler-icons-react';
import { useSendFriendRequestMutation } from '../../../graphql/generated/graphql';

type Props = {
  user: {
    id: string;
  };
};

const StrangerMenu = ({ user }: Props) => {
  const [sendFriendRequest] = useSendFriendRequestMutation();

  return (
    <ActionIcon
      type="button"
      onClick={() => {
        sendFriendRequest({
          variables: {
            friendId: user.id,
          },
        });
      }}
    >
      <UserPlus />
    </ActionIcon>
  );
};
