import { Avatar, MantineNumberSize } from '@mantine/core';
import { CSSProperties } from 'react';
import { getChatAvatar } from 'utils/avatar';

type Props = {
  chatName: string;
  size?: MantineNumberSize;
  style?: CSSProperties;
};

const ChatAvatar = ({ chatName, style, size = 'sm' }: Props) => (
  <Avatar
    size={size}
    radius={'sm'}
    style={style}
    src={getChatAvatar(chatName)}
  />
);

export default ChatAvatar;
