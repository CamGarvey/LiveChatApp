import { Avatar, DefaultProps, MantineNumberSize } from '@mantine/core';
import { getUserAvatar } from 'utils/avatar';

type Props = {
  username: string;
  size?: MantineNumberSize;
} & DefaultProps;

const UserAvatar = ({ username, size = 'md', ...others }: Props) => {
  return (
    <Avatar
      size={size}
      radius={'xl'}
      src={getUserAvatar(username)}
      {...others}
    />
  );
};

export default UserAvatar;
