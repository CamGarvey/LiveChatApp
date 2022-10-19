import { gql } from '@apollo/client';
import { Group, Skeleton, Text } from '@mantine/core';
import ChatUpdateAction from 'components/shared/ChatUpdateAction';
import { OpenedHeaderChatFragment } from 'graphql/generated/graphql';
import { useMemo } from 'react';
import ArrowAvatar from '../ArrowAvatar';

type Props = {
  chat?: OpenedHeaderChatFragment | null | undefined;
  loading: boolean;
  onClose: () => void;
};

const OpenedHeader = ({ chat, loading, onClose }: Props) => {
  const name = useMemo(() => {
    switch (chat?.__typename) {
      case 'GroupChat':
        return chat.name;
      case 'DirectMessageChat':
        return chat.friend.username;
      default:
        return 'Error';
    }
  }, [chat]);

  return (
    <Group
      sx={{
        flexFlow: 'nowrap',
      }}
    >
      <ArrowAvatar dir={'right'} onClick={onClose} />
      <Skeleton visible={loading}>
        <Text
          p={1}
          lineClamp={1}
          sx={{
            lineHeight: '1',
            width: '100%',
          }}
        >
          {name}
        </Text>
      </Skeleton>
      {chat?.__typename === 'DirectMessageChat' && (
        <ChatUpdateAction size={'md'} />
      )}
    </Group>
  );
};

OpenedHeader.fragments = {
  chat: gql`
    fragment OpenedHeaderChat on Chat {
      ... on GroupChat {
        name
      }
      ... on DirectMessageChat {
        friend {
          username
        }
      }
    }
  `,
};

export default OpenedHeader;
