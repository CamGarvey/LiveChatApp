import React from 'react';
import {
  ActionIcon,
  Avatar,
  Box,
  Center,
  Menu,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { Mailbox, MailForward, UserMinus, UserPlus } from 'tabler-icons-react';
import {
  FriendStatus,
  useAcceptFriendRequestMutation,
  useCancelFriendRequestMutation,
  useDeclineFriendRequestMutation,
  useDeleteFriendMutation,
  useSendFriendRequestMutation,
} from '../../graphql/generated/graphql';
import { User } from '../../models';

type Props = {
  user: User;
};

const UserItem = ({ user }: Props) => {
  const { name, username, friendStatus } = user;

  // Update friend status mutations
  const [cancelFriendRequest] = useCancelFriendRequestMutation();
  const [sendFriendRequest] = useSendFriendRequestMutation();
  const [declineFriendRequest] = useDeclineFriendRequestMutation();
  const [acceptFriendRequest] = useAcceptFriendRequestMutation();
  const [deleteFriend] = useDeleteFriendMutation();

  let menu: React.ReactElement;

  switch (friendStatus) {
    case FriendStatus.Friend:
      menu = (
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
      break;
    case FriendStatus.NotFriend:
      menu = (
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
      break;
    case FriendStatus.RequestSent:
      menu = (
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
                  friendId: user.id,
                },
              });
            }}
          >
            Cancel Friend Request
          </Menu.Item>
        </Menu>
      );
      break;
    case FriendStatus.RequestReceived:
      menu = (
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
                  friendId: user.id,
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
                  friendId: user.id,
                },
              });
            }}
          >
            Decline
          </Menu.Item>
        </Menu>
      );
      break;
  }

  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'flex',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        gap: '20px',
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        alignItems: 'center',
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Avatar
        size="sm"
        src={`https://avatars.dicebear.com/api/initials/${username}.svg`}
      />
      <Stack spacing={0}>
        <Text>{username}</Text>
        <Text size={'xs'} color={'dimmed'}>
          {name}
        </Text>
      </Stack>
      <Box ml={'auto'}>{menu}</Box>
    </UnstyledButton>
  );
};

export default UserItem;
