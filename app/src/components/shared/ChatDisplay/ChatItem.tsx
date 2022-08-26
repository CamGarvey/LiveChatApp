import { gql } from '@apollo/client';
import { Avatar, Group, Text, UnstyledButton } from '@mantine/core';
import { ChatItemFragment } from 'graphql/generated/graphql';
import { NavLink } from 'react-router-dom';
import ChatAvatar from '../ChatAvatar';
import UserAvatar from '../UserAvatar';

type Props = {
  chat: ChatItemFragment;
  onClick?: () => void;
};

const ChatItem = ({ chat, onClick }: Props) => {
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
      to={`/chats/${chat.id}`}
      style={{
        textDecoration: 'none',
      }}
      onClick={onClick}
    >
      {({ isActive }) => (
        <UnstyledButton
          sx={(theme) => ({
            display: 'block',
            width: '100%',
            padding: theme.spacing.xs,
            borderRadius: theme.radius.sm,
            color:
              theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

            backgroundColor:
              isActive &&
              (theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[1]),
            '&:hover': {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[6]
                  : theme.colors.gray[1],
            },
          })}
        >
          <Group spacing={'sm'}>
            <ChatAvatar chat={chat} />
            <Text size="sm">{name}</Text>
            {members.length !== 0 && (
              <Avatar.Group ml={'auto'}>
                {members.slice(0, 2).map((member) => (
                  <UserAvatar key={member.id} user={member} />
                ))}
                {members.length > 2 && <Avatar>+{members.length - 2}</Avatar>}
              </Avatar.Group>
            )}
          </Group>
        </UnstyledButton>
      )}
    </NavLink>
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
