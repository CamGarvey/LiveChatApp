import { ActionIcon, Menu, Text } from '@mantine/core';
import { Mailbox, MailForward, UserMinus, UserPlus } from 'tabler-icons-react';
import {
  FriendStatus,
  useAcceptFriendRequestMutation,
  useCancelFriendRequestMutation,
  useDeclineFriendRequestMutation,
  useDeleteFriendMutation,
  useSendFriendRequestMutation,
} from '../../../graphql/generated/graphql';

type Props = {
  user: {
    id: string;
    friendStatus: FriendStatus;
  };
};

export const FriendMenu = ({ user: { id, friendStatus } }: Props) => {
  const [cancelFriendRequest] = useCancelFriendRequestMutation();
  const [sendFriendRequest] = useSendFriendRequestMutation();
  const [declineFriendRequest] = useDeclineFriendRequestMutation();
  const [acceptFriendRequest] = useAcceptFriendRequestMutation();
  const [deleteFriend] = useDeleteFriendMutation();

  switch (friendStatus) {
    case FriendStatus.Friend:
      return (
        <Menu>
          <Menu.Item
            icon={<UserMinus />}
            type="button"
            onClick={() => {
              deleteFriend({
                variables: {
                  friendId: id,
                },
              });
            }}
          >
            <Text>Unfriend</Text>
          </Menu.Item>
        </Menu>
      );
    case FriendStatus.NotFriend:
      return (
        <ActionIcon
          type="button"
          onClick={() => {
            sendFriendRequest({
              variables: {
                friendId: id,
              },
            });
          }}
        >
          <UserPlus />
        </ActionIcon>
      );
    case FriendStatus.RequestSent:
      return (
        <Menu
          control={
            <ActionIcon type="button">
              <MailForward />
            </ActionIcon>
          }
        >
          <Menu.Item
            onClick={() => {
              cancelFriendRequest({
                variables: {
                  friendId: id,
                },
              });
            }}
          >
            Cancel Friend Request
          </Menu.Item>
        </Menu>
      );
    case FriendStatus.RequestReceived:
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
                  friendId: id,
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
                  friendId: id,
                },
              });
            }}
          >
            Decline
          </Menu.Item>
        </Menu>
      );
  }
};
