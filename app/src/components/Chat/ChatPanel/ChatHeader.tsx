import { gql } from '@apollo/client';
import { LoadingOverlay, Stack, Text } from '@mantine/core';
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
      friend {
        name
      }
    }
    ... on GroupChat {
      name
      description
    }
  }
`;

type Props = {
  chatId: string;
};

const ChatHeader = ({ chatId }: Props) => {
  const [getChat, { data, loading, error }] =
    useGetChatForChatHeaderLazyQuery();
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
    <Stack
      m={0}
      py={2}
      px={'sm'}
      sx={{
        height: '60px',
        width: '100%',
      }}
      justify={'center'}
    >
      <LoadingOverlay visible={!data || loading} />
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
    </Stack>
  );
};

export default ChatHeader;
