import { gql } from '@apollo/client';
import { Aside, Group, Skeleton, Text } from '@mantine/core';
import ChatUpdateAction from 'components/shared/ChatUpdateAction';
import { HeaderSectionChatFragment } from 'graphql/generated/graphql';
import { useMemo } from 'react';
import ArrowAvatar from '../../ArrowAvatar';

type Props = {
  chat?: HeaderSectionChatFragment | null | undefined;
  loading: boolean;
  onClose: () => void;
};

export const HeaderSection = ({ chat, loading, onClose }: Props) => {
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
    <Aside.Section>
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
        {chat?.__typename === 'GroupChat' && <ChatUpdateAction size={'md'} />}
      </Group>
    </Aside.Section>
  );
};

HeaderSection.fragments = {
  chat: gql`
    fragment HeaderSectionChat on Chat {
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
