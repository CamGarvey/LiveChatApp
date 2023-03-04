import { gql } from '@apollo/client';
import { Avatar, NavLink } from '@mantine/core';
import {
  ChatItemFragment,
  ChatItemUserFragment,
} from 'graphql/generated/graphql';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDrawer } from 'store';
import { ChatAvatar, UserAvatar } from 'components/shared/Avatars';

type Props = {
  chat: ChatItemFragment;
};

const ChatItem = ({ chat }: Props) => {
  const location = useLocation();
  const drawer = useDrawer();

  const name = useMemo(() => {
    switch (chat.__typename) {
      case 'DeletedChat':
        return 'Deleted Chat';
      case 'DirectMessageChat':
        return chat.friend.username;
      case 'GroupChat':
        return chat.name;
      default:
        return '';
    }
  }, [chat]);

  const users = useMemo<ChatItemUserFragment[]>(() => {
    if (chat.__typename === 'GroupChat')
      return (
        chat.members.edges
          ?.filter((x) => !!x?.node?.user)
          .map((x) => x!.node!.user as ChatItemUserFragment) ?? []
      );
    return [];
  }, [chat]);

  return (
    <NavLink
      component={Link}
      to={`/chats/${chat.id}`}
      style={{
        textDecoration: 'none',
      }}
      onClick={() => drawer.close()}
      active={location.pathname === `/chats/${chat.id}`}
      icon={<ChatAvatar chat={chat} />}
      label={name}
      rightSection={
        chat.__typename === 'GroupChat' && (
          <Avatar.Group ml={'auto'}>
            {users.map((user) => (
              <UserAvatar key={user.id} user={user} />
            ))}
            {chat.memberCount > 2 && (
              <Avatar radius={'xl'}>+{chat.memberCount - users.length}</Avatar>
            )}
          </Avatar.Group>
        )
      }
    />
  );
};

ChatItem.fragments = {
  chat: gql`
    fragment ChatItem on Chat {
      id
      ...ChatAvatar
      ... on DirectMessageChat {
        friend {
          ...ChatItemUser
        }
      }
      ... on GroupChat {
        name
        members(first: $firstMembers, after: $afterMember) {
          totalCount
          edges {
            node {
              user {
                ...ChatItemUser
              }
            }
          }
        }
      }
    }
    fragment ChatItemUser on User {
      id
      username
    }
    ${ChatAvatar.fragments.chat}
  `,
};

export default ChatItem;
