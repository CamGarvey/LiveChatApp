import { gql } from '@apollo/client';
import { Avatar, NavLink } from '@mantine/core';
import { ChatItemFragment } from 'graphql/generated/graphql';
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
            {chat.members.slice(0, 2).map((member) => (
              <UserAvatar key={member.id} user={member} />
            ))}
            {chat.members.length > 2 && (
              <Avatar radius={'xl'}>+{chat.members.length - 2}</Avatar>
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
        members {
          ...ChatItemUser
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
