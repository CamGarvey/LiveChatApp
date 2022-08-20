import { ActionIcon, Menu } from '@mantine/core';
import { Mailbox } from 'tabler-icons-react';
import {
  useDeclineFriendRequestMutation,
  useAcceptFriendRequestMutation,
} from 'graphql/generated/graphql';

type Props = {
  request: {
    id: string;
  };
};

const FriendRequestReceivedMenu = ({ request }: Props) => {
  const [declineFriendRequest] = useDeclineFriendRequestMutation();
  const [acceptFriendRequest] = useAcceptFriendRequestMutation();
  return (
    <Menu
      control={
        <ActionIcon type="button">
          <Mailbox />
        </ActionIcon>
      }
    >
      <Menu.Item
        onClick={() => {
          acceptFriendRequest({
            variables: {
              friendRequestId: request.id,
            },
          });
        }}
      >
        Accept
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          declineFriendRequest({
            variables: {
              friendRequestId: request.id,
            },
          });
        }}
      >
        Decline
      </Menu.Item>
    </Menu>
  );
};

export default FriendRequestReceivedMenu;
