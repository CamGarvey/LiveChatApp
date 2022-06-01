import React, { useState } from 'react';
import {
  ActionIcon,
  Avatar,
  Box,
  Menu,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { Mailbox, MailForward, UserMinus, UserPlus } from 'tabler-icons-react';
import User from './User';
import {
  AcceptFriendRequestMutation,
  CancelFriendRequestMutation,
  DeclineFriendRequestMutation,
  DeleteFriendMutation,
  FriendStatus,
  SendFriendRequestMutation,
  useAcceptFriendRequestMutation,
  useCancelFriendRequestMutation,
  useDeclineFriendRequestMutation,
  useDeleteFriendMutation,
  useSendFriendRequestMutation,
} from '../../graphql/generated/graphql';
import { ApolloCache, FetchResult } from '@apollo/client';

type Props = {
  user: User;
  onSendFriendRequestClicked?: () => void;
  onUnFriendClicked?: () => void;
  onCancelRequestClicked?: () => void;
  onAcceptFriendRequestClicked?: () => void;
  onDeclineFriendRequestClicked?: () => void;
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
                update: updateFriendStatusCache<DeleteFriendMutation>(
                  user,
                  FriendStatus.NotFriend
                ),
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
              update: updateFriendStatusCache<SendFriendRequestMutation>(
                user,
                FriendStatus.RequestSent
              ),
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
                update: updateFriendStatusCache<CancelFriendRequestMutation>(
                  user,
                  FriendStatus.NotFriend
                ),
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
            <ActionIcon
              type="button"
              onClick={() => {
                declineFriendRequest({
                  variables: {
                    friendId: user.id,
                  },
                  update: updateFriendStatusCache<DeclineFriendRequestMutation>(
                    user,
                    FriendStatus.NotFriend
                  ),
                });
              }}
            >
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
                update: updateFriendStatusCache<AcceptFriendRequestMutation>(
                  user,
                  FriendStatus.Friend
                ),
              });
            }}
          >
            Accept
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
        src={`https://avatars.dicebear.com/api/initials/${name}.svg`}
      />
      <Text>{name}</Text>
      <Text>{username}</Text>
      <Box ml={'auto'}>{menu}</Box>
    </UnstyledButton>
  );
};

const updateFriendStatusCache = <T,>(
  user: User,
  friendStatus: FriendStatus
) => {
  return (
    cache: ApolloCache<T>,
    {
      data,
      errors,
    }: Omit<FetchResult<T, Record<string, any>, Record<string, any>>, 'context'>
  ) => {
    if (!errors) {
      cache.modify({
        id: cache.identify(user),
        fields: {
          friendStatus() {
            return friendStatus;
          },
        },
      });
    }
  };
};

export default UserItem;
