import {
  Avatar,
  AvatarsGroup,
  Group,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { NavLink } from 'react-router-dom';

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
  const nameOf = isDM ? chat.friend.username : chat.name;

  const members = isDM ? [chat.friend] : chat.members;

  return (
    <NavLink
      to={`${chat.id}`}
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
          <Group>
            <Avatar
              size="sm"
              src={`https://avatars.dicebear.com/api/initials/${nameOf}.svg`}
            />
            <Text size="sm">{nameOf}</Text>
            <AvatarsGroup
              ml={'auto'}
              limit={4}
              total={members.length}
              size={'sm'}
            >
              {members.slice(0, 2).map((member) => (
                <Avatar
                  key={member.username}
                  src={`https://avatars.dicebear.com/api/initials/${member.username}.svg`}
                />
              ))}
            </AvatarsGroup>
          </Group>
        </UnstyledButton>
      )}
    </NavLink>
  );
};

export default ChatItem;
