import React from 'react';
import { Box, Stack, Text, UnstyledButton } from '@mantine/core';
import UserAvatar from '../UserAvatar';
import { useUser } from 'context/UserContext';
import { gql } from '@apollo/client';
import { UserItemFragment } from 'graphql/generated/graphql';

type Props = {
  user: UserItemFragment;
  menu?: React.ReactChild;
};
const UserItem = ({ user, menu }: Props) => {
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
      <UserAvatar size="sm" username={username} />
      <Stack spacing={0}>
        <Text>
          {username}
          {user.__typename === 'Me' && ' (YOU)'}
        </Text>
        <Text size={'xs'} color={'dimmed'}>
          {name}
        </Text>
      </Stack>
      {menu && user.__typename === 'Me' && <Box ml={'auto'}>{menu}</Box>}
    </UnstyledButton>
  );
};

UserItem.fragments = {
  user: gql`
    fragment UserItem on User {
      username
      name
    }
  `,
};

export default UserItem;
