import { gql } from '@apollo/client';
import { Avatar, MantineNumberSize } from '@mantine/core';
import { ChatAvatarFragment } from 'graphql/generated/graphql';
import { CSSProperties, useMemo } from 'react';
import { getChatAvatar } from 'utils/avatar';

type Props = {
  chat: ChatAvatarFragment;
  size?: MantineNumberSize;
  style?: CSSProperties;
};

const ChatAvatar = ({ chat, style, size = 'sm' }: Props) => {
  const name = useMemo(() => {
    switch (chat.__typename) {
      case 'DeletedChat':
        return 'Deleted Chat';
      case 'DirectMessageChat':
        return chat.friend.username;
      case 'GroupChat':
        return chat.name;
      default:
        return '';
    }
  }, [chat]);

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
