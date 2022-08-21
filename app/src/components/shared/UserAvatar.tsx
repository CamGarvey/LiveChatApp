import { Avatar, MantineNumberSize, Sx } from '@mantine/core';
import { CSSProperties } from 'react';
import { getUserAvatar } from 'utils/avatar';

type Props = {
  username: string;
  size?: MantineNumberSize;
  style?: CSSProperties;
  sx?: Sx | (Sx | undefined)[];
};

const UserAvatar = ({ username, size = 'md', style, sx }: Props) => (
  <Avatar
    size={size}
    radius={'xl'}
    src={getUserAvatar(username)}
    style={style}
    sx={sx}
  />
);

export default UserAvatar;
