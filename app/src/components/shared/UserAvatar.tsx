import { gql } from '@apollo/client';
import {
  Avatar,
  Group,
  HoverCard,
  MantineNumberSize,
  Popover,
  Skeleton,
  Stack,
  Text,
} from '@mantine/core';
import { UserAvatarFragment } from 'graphql/generated/graphql';
import { CSSProperties } from 'react';
import { getUserAvatar } from 'utils/avatar';

type Props = {
  user?: UserAvatarFragment;
  loading?: boolean;
  size?: MantineNumberSize;
  style?: CSSProperties;
  dropdown?: {
    style?: CSSProperties;
  };
};

const sizes = {
  xs: 16,
  sm: 26,
  md: 38,
  lg: 56,
  xl: 84,
};

const UserAvatar = ({
  user,
  size = 'md',
  loading = false,
  style,
  dropdown,
}: Props) => {
  if (loading) {
    return <Skeleton height={sizes[size]} circle />;
  }
  if (!user) {
    return (
      <Avatar size={size} radius={'xl'}>
        ?
      </Avatar>
    );
  }
  return (
    <HoverCard
      openDelay={1000}
      width={'max-content'}
      position={'left'}
      withArrow
    >
      <HoverCard.Target>
        <Avatar
          size={size}
          radius={'xl'}
          src={getUserAvatar(user.username)}
          style={style}
        />
      </HoverCard.Target>
      <Popover.Dropdown
        style={{
          minWidth: '200px',
          ...dropdown?.style,
        }}
      >
        <Group>
          <Avatar
            size={'lg'}
            radius={'xl'}
            src={getUserAvatar(user.username)}
            style={style}
          />
          <Stack spacing={1}>
            <Text size={'lg'}>{user.username}</Text>
            {user.name && <Text color={'dimmed'}>{user.name}</Text>}
          </Stack>
        </Group>
      </Popover.Dropdown>
    </HoverCard>
  );
};

UserAvatar.fragments = {
  user: gql`
    fragment UserAvatar on User {
      id
      username
      name
    }
  `,
};

export default UserAvatar;
