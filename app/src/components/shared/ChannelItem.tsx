import {
  Avatar,
  AvatarsGroup,
  Group,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { NavLink } from 'react-router-dom';

type Props = {
  id: string;
  name: string;
  members: { username: string }[];
  onClick?: () => void;
};

const ChannelItem = ({ id, name, members, onClick }: Props) => {
  return (
    <NavLink
      to={`${id}`}
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
              src={`https://avatars.dicebear.com/api/initials/${name}.svg`}
            />
            <Text size="sm">{name}</Text>
            <AvatarsGroup ml={'auto'} limit={3} total={members.length}>
              {members.slice(0, 2).map((member) => (
                <Avatar
                  radius={'xs'}
                  size="sm"
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

export default ChannelItem;
