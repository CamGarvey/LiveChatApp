import { Avatar, Group, Text, UnstyledButton } from '@mantine/core';
import { NavLink } from 'react-router-dom';

type Props = {
  id: string;
  name: string;
};

const ChannelItem = ({ id, name }: Props) => {

  return (
    <NavLink
      to={`${id}`}
      style={{
        textDecoration: 'none',
      }}
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
          </Group>
        </UnstyledButton>
      )}
    </NavLink>
  );
};

export default ChannelItem;
