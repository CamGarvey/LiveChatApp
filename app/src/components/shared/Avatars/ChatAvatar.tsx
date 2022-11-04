import { gql } from '@apollo/client';
import { Avatar, MantineNumberSize, Skeleton } from '@mantine/core';
import { ChatAvatarFragment } from 'graphql/generated/graphql';
import { CSSProperties, useMemo } from 'react';
import { AVATAR_SIZES, getChatAvatar, getUserAvatar } from 'utils/avatar';

type Props = {
  chat?: ChatAvatarFragment | null | undefined;
  loading?: boolean;
  size?: MantineNumberSize;
  style?: CSSProperties;
};

export const ChatAvatar = ({
  chat,
  style,
  size = 'sm',
  loading = false,
}: Props) => {
  const src = useMemo(() => {
    switch (chat?.__typename) {
      case 'DirectMessageChat':
        return getUserAvatar(chat.friend.username);
      case 'GroupChat':
        return getChatAvatar(chat.name);
      default:
        return '?';
    }
  }, [chat]);

  if (loading) {
    return <Skeleton height={AVATAR_SIZES[size]} circle />;
  }

  if (!chat) {
    return (
      <Avatar size={size} radius={'sm'}>
        ?
      </Avatar>
    );
  }

  return <Avatar size={size} radius={'sm'} style={style} src={src} />;
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
