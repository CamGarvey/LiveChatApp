import { gql } from '@apollo/client';
import { Avatar, MantineNumberSize, Sx, Tooltip } from '@mantine/core';
import { UserAvatarFragment } from 'graphql/generated/graphql';
import { CSSProperties } from 'react';
import { getUserAvatar } from 'utils/avatar';

type Props = {
  user: UserAvatarFragment;
  size?: MantineNumberSize;
  hideTooltip?: boolean;
  style?: CSSProperties;
  sx?: Sx | (Sx | undefined)[];
};

const UserAvatar = ({
  user,
  size = 'md',
  hideTooltip = false,
  style,
  sx,
}: Props) => (
  <Tooltip hidden={hideTooltip} label={user.username}>
    <Avatar
      size={size}
      radius={'xl'}
      src={getUserAvatar(user.username)}
      style={style}
      sx={sx}
    />
  </Tooltip>
);

UserAvatar.fragments = {
  user: gql`
    fragment UserAvatar on User {
      id
      username
    }
  `,
};

export default UserAvatar;
