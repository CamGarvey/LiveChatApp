import { gql } from '@apollo/client';
import {
  Avatar,
  MantineNumberSize,
  Sx,
  Tooltip,
  TooltipProps,
} from '@mantine/core';
import { UserAvatarFragment } from 'graphql/generated/graphql';
import { CSSProperties } from 'react';
import { getUserAvatar } from 'utils/avatar';

type Props = {
  user: UserAvatarFragment;
  size?: MantineNumberSize;
  tooltip?: Omit<TooltipProps, 'children' | 'label'>;
  style?: CSSProperties;
  sx?: Sx | (Sx | undefined)[];
};

const UserAvatar = ({ user, size = 'md', tooltip, style, sx }: Props) => (
  <Tooltip label={user.username} {...tooltip}>
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
