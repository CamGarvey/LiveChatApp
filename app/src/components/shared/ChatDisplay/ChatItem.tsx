import { gql } from '@apollo/client';
import { Avatar, Group, NavLink, Text, UnstyledButton } from '@mantine/core';
import { ChatItemFragment } from 'graphql/generated/graphql';
import { Link, useLocation } from 'react-router-dom';
import ChatAvatar from '../ChatAvatar';
import UserAvatar from '../UserAvatar';

type Props = {
  chat: ChatItemFragment;
  onClick?: () => void;
};

const ChatItem = ({ chat, onClick }: Props) => {
  const location = useLocation();
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
  }

  const members =
    chat.__typename === 'DeletedChat'
      ? []
      : chat.__typename === 'DirectMessageChat'
      ? [chat.friend]
      : chat.members;

  return (
    <NavLink
      component={Link}
      to={`/chats/${chat.id}`}
      style={{
        textDecoration: 'none',
      }}
      onClick={onClick}
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
          id
          username
        }
      }
      ... on GroupChat {
        name
        members {
          id
          username
        }
      }
    }
    ${ChatAvatar.fragments.chat}
  `,
};

export default ChatItem;
