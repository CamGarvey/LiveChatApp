import { gql } from '@apollo/client';
import { Avatar, MantineNumberSize, Sx } from '@mantine/core';
import { UserAvatarFragment } from 'graphql/generated/graphql';
import { CSSProperties } from 'react';
import { getUserAvatar } from 'utils/avatar';

type Props = {
  user: UserAvatarFragment;
  size?: MantineNumberSize;
  style?: CSSProperties;
  sx?: Sx | (Sx | undefined)[];
};

const UserAvatar = ({ user, size = 'md', style, sx }: Props) => (
  <Avatar
    size={size}
    radius={'xl'}
    src={getUserAvatar(user.username)}
    style={style}
    sx={sx}
  />
);

UserAvatar.fragments = {
  user: gql`
    fragment UserAvatar on User {
      username
    }
  `,
};

export default UserAvatar;
