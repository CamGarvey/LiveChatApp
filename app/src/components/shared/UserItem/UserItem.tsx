import React from 'react';
import { Avatar, Box, Stack, Text, UnstyledButton } from '@mantine/core';
import UserAvatar from '../UserAvatar';
import { useUser } from 'context/UserContext';

type Props = {
  user:
    | {
        __typename?: 'Friend';
        id: any;
        name?: string;
        username: string;
      }
    | {
        __typename?: 'Me';
        id: any;
        name?: string;
        username: string;
      }
    | {
        __typename?: 'Stranger';
        id: any;
        name?: string;
        username: string;
      };
  menu?: React.ReactChild;
};
const UserItem = ({ user, menu }: Props) => {
  const { user: currentUser } = useUser();
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
          {currentUser.id === user.id && ' (YOU)'}
        </Text>
        <Text size={'xs'} color={'dimmed'}>
          {name}
        </Text>
      </Stack>
      {menu && currentUser.id !== user.id && <Box ml={'auto'}>{menu}</Box>}
    </UnstyledButton>
  );
};

export default UserItem;
