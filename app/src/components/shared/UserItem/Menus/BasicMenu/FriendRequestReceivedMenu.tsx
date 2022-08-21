import { ActionIcon, Menu } from '@mantine/core';
import { Mailbox, Menu2 } from 'tabler-icons-react';
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
    <Menu>
      <Menu.Target>
        <ActionIcon type="button">
          <Mailbox />
        </ActionIcon>
      </Menu.Target>
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
