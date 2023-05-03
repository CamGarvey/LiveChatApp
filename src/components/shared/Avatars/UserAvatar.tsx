import { gql } from '@apollo/client';
import {
  Avatar,
  AvatarProps,
  Group,
  HoverCard,
  HoverCardDropdownProps,
  HoverCardProps,
  MantineNumberSize,
  Popover,
  Skeleton,
  Stack,
  Text,
} from '@mantine/core';
import { UserAvatarFragment } from 'graphql/generated/graphql';
import { AVATAR_SIZES, getUserAvatar } from 'utils/avatar';

type Props = {
  user?: UserAvatarFragment | undefined;
  loading?: boolean;
  size?: MantineNumberSize;
  dropdown?: HoverCardDropdownProps;
  hoverCard?: HoverCardProps;
} & AvatarProps;

export const UserAvatar = ({
  user,
  size = 'md',
  loading = false,
  dropdown,
  hoverCard,
  ...other
}: Props) => {
  if (loading) {
    return <Skeleton height={AVATAR_SIZES[size]} circle />;
  }
  if (!user) {
    return (
      <Avatar size={size} radius={'xl'} {...other}>
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
      {...hoverCard}
      withinPortal
    >
      <HoverCard.Target>
        <Avatar
          size={size}
          radius={'xl'}
          src={getUserAvatar(user.username)}
          {...other}
        />
      </HoverCard.Target>
      <Popover.Dropdown
        style={{
          minWidth: '200px',
        }}
        {...dropdown}
      >
        <Group>
          <Avatar
            size={'lg'}
            radius={'xl'}
            src={getUserAvatar(user.username)}
            {...other}
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
