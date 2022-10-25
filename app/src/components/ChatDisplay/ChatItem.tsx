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

  const members = useMemo<ChatItemUserFragment[]>(() => {
    if (chat.__typename === 'GroupChat')
      return (
        chat.members.edges
          ?.filter((x) => !!x)
          .map((x) => x!.node as ChatItemUserFragment) ?? []
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
            {members.map((member) => (
              <UserAvatar key={member.id} user={member} />
            ))}
            {chat.memberCount > 2 && (
              <Avatar radius={'xl'}>
                +{chat.memberCount - members.length}
              </Avatar>
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
        memberCount
        members(first: $firstMembers, after: $afterMember) {
          edges {
            node {
              ...ChatItemUser
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
