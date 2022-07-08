import React from 'react';
import { Avatar, Box, Stack, Text, UnstyledButton } from '@mantine/core';
import { User } from '../../../models';

type Props = {
  user: User;
  menu?: React.ReactChild;
};

export const UserItem = ({ user, menu }: Props) => {
  const { name, username } = user;

  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'flex',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        gap: '20px',
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        alignItems: 'center',
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Avatar
        size="sm"
        src={`https://avatars.dicebear.com/api/initials/${username}.svg`}
      />
      <Stack spacing={0}>
        <Text>{username}</Text>
        <Text size={'xs'} color={'dimmed'}>
          {name}
        </Text>
      </Stack>
      {menu && <Box ml={'auto'}>{menu}</Box>}
    </UnstyledButton>
  );
};
