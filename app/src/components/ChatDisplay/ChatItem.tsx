import { gql } from '@apollo/client';
import { Avatar, NavLink } from '@mantine/core';
import {
  ChatItemFragment,
  ChatItemUserFragment,
} from 'graphql/generated/graphql';
import { Link, useLocation } from 'react-router-dom';
import { useDrawer } from 'store';
import ChatAvatar from '../shared/ChatAvatar';
import UserAvatar from '../shared/UserAvatar';

type Props = {
  chat: ChatItemFragment;
};

const ChatItem = ({ chat }: Props) => {
  const location = useLocation();
  const drawer = useDrawer();
  let name: string;

  switch (chat.__typename) {
    case 'DeletedChat':
      name = 'Deleted Chat';
      break;
    case 'DirectMessageChat':
      name = chat.friend.username;
      break;
    case 'GroupChat':
      name = chat.name;
      break;
    default:
      name = '';
  }

  let members: ChatItemUserFragment[];

  switch (chat.__typename) {
    case 'DirectMessageChat':
      members = [chat.friend];
      break;
    case 'GroupChat':
      members = chat.members;
      break;
    default:
      members = [];
  }

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
        <Avatar.Group ml={'auto'}>
          {members.slice(0, 2).map((member) => (
            <UserAvatar key={member.id} user={member} />
          ))}
          {members.length > 2 && (
            <Avatar radius={'xl'}>+{members.length - 2}</Avatar>
          )}
        </Avatar.Group>
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
