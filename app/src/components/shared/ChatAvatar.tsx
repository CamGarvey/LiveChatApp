import { gql } from '@apollo/client';
import { Avatar, MantineNumberSize } from '@mantine/core';
import { ChatAvatarFragment } from 'graphql/generated/graphql';
import { CSSProperties } from 'react';
import { getChatAvatar } from 'utils/avatar';

type Props = {
  chat: ChatAvatarFragment;
  size?: MantineNumberSize;
  style?: CSSProperties;
};

const ChatAvatar = ({ chat, style, size = 'sm' }: Props) => {
  let name: string;
  switch (chat.__typename) {
    case 'DeletedChat':
      name = 'Deleted Chat';
      break;
    case 'DirectMessageChat':
      name = chat.friend.username;
      break;
    case 'GroupChat':
      name = chat.name;
  }
  return (
    <Avatar size={size} radius={'sm'} style={style} src={getChatAvatar(name)} />
  );
};

ChatAvatar.fragments = {
  chat: gql`
    fragment ChatAvatar on Chat {
      id
      ... on GroupChat {
        name
      }
      ... on DirectMessageChat {
        friend {
          id
          username
        }
      }
    }
  `,
};

export default ChatAvatar;
