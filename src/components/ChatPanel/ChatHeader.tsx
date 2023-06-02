import { gql } from '@apollo/client';
import { Group, Skeleton, Stack, Text } from '@mantine/core';
import { ChatAvatar } from 'components/shared/Avatars';
import { useGetChatForChatHeaderLazyQuery } from 'graphql/generated/graphql';
import { useEffect } from 'react';

gql`
  query GetChatForChatHeader($chatId: HashId!) {
    chat(chatId: $chatId) {
      ...ChatHeaderChat
    }
  }
  fragment ChatHeaderChat on Chat {
    ... on DirectMessageChat {
      recipient {
        user {
          username
        }
      }
    }
    ... on GroupChat {
      name
      description
    }
    ...ChatAvatar
  }
  ${ChatAvatar.fragments.chat}
`;

type Props = {
  chatId: string;
};

const ChatHeader = ({ chatId }: Props) => {
  const [getChat, { data, loading, error }] = useGetChatForChatHeaderLazyQuery();
  useEffect(() => {
    if (chatId) {
      getChat({
        variables: {
          chatId,
        },
      });
    }
  }, [chatId, getChat]);

  const chat = data?.chat;

  if (error) return <></>;

  return (
    <Group
      m={0}
      py={2}
      px={'sm'}
      sx={{
        height: '60px',
        width: '100%',
        flexWrap: 'nowrap',
      }}
    >
      <ChatAvatar loading={loading} chat={chat} />
      {loading ? (
        <Stack
          spacing={2}
          sx={{
            width: '100%',
          }}
        >
          <Skeleton height={8} mt={6} width="20%" radius="xl" />
          <Skeleton height={8} mt={6} width="40%" radius="xl" />
        </Stack>
      ) : (
        <>
          {chat?.__typename === 'GroupChat' && (
            <Stack spacing={0}>
              <Text>{chat.name}</Text>
              {chat.description && (
                <Text color={'dimmed'} size={'md'}>
                  {chat.description}
                </Text>
              )}
            </Stack>
          )}
          {chat?.__typename === 'DirectMessageChat' && <Text>{chat.recipient.user.username}</Text>}
        </>
      )}
    </Group>
  );
};

export default ChatHeader;
