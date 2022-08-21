import { Avatar, Group, Text, UnstyledButton } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import ChatAvatar from '../ChatAvatar';
import UserAvatar from '../UserAvatar';

type Props = {
  chat:
    | {
        __typename: 'GroupChat';
        id: string;
        name: string;
        description?: string;
        members: {
          id: string;
          username: string;
        }[];
      }
    | {
        __typename: 'DirectMessageChat';
        id: string;
        friend: {
          id: string;
          username: string;
        };
      };
  onClick?: () => void;
};

const ChatItem = ({ chat, onClick }: Props) => {
  const isDM = chat.__typename === 'DirectMessageChat';
  const chatName = isDM ? chat.friend.username : chat.name;

  const members = isDM ? [chat.friend] : chat.members;

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
            <ChatAvatar chatName={chatName} />
            <Text size="sm">{chatName}</Text>
            <Avatar.Group ml={'auto'}>
              {members.slice(0, 2).map((member) => (
                <UserAvatar username={member.username} />
              ))}
              {members.length > 2 && <Avatar>+{members.length - 2}</Avatar>}
            </Avatar.Group>
          </Group>
        </UnstyledButton>
      )}
    </NavLink>
  );
};

export default ChatItem;
