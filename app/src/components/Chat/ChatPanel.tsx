import { Center, Stack, Text } from '@mantine/core';
import {
  MessageCreatedDocument,
  useCreateMessageMutation,
  useGetChatMessagesQuery,
  useGetMeQuery,
} from '../../graphql/generated/graphql';
import { useEffect, useState } from 'react';
import Scroller from './Scroller';
import ChatInput from './ChatInput';
import Message from './Message';
import { groupMessages } from '../../util';
import { motion } from 'framer-motion';

type MessageData = {
  id: string;
  content: string;
  createdAt: any;
  createdBy: {
    id: string;
    name?: string;
    username: string;
  };
};

type Props = {
  chatId: string;
};

export const ChatPanel = ({ chatId }: Props) => {
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  // Get info about current user
  const {
    data: meData,
    loading: isLoadingMeData,
    error: meError,
  } = useGetMeQuery();

  const {
    loading: isLoadingMessages,
    data,
    error: messagesError,
    subscribeToMore,
    fetchMore,
  } = useGetChatMessagesQuery({
    variables: {
      chatId,
      last: 20,
    },
    fetchPolicy: 'network-only',
  });

  const hasPreviousPage =
    data?.chatMessages?.pageInfo?.hasPreviousPage ?? false;

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: MessageCreatedDocument,
      variables: {
        chatId,
      },
      updateQuery: (prev, { subscriptionData }: any) => {
        if (!subscriptionData.data) return prev;
        const messageCreated = subscriptionData.data.messageCreated;
        const newCache = Object.assign({}, prev, {
          chatMessages: {
            edges: [
              ...prev.chatMessages.edges,
              {
                __typename: 'MessageEdge',
                node: messageCreated,
              },
            ],
            pageInfo: prev.chatMessages.pageInfo,
          },
        });
        return newCache;
      },
    });
    return () => unsubscribe();
  }, [chatId, subscribeToMore]);

  const [createMessageMutation, { loading: loadingCreateMessage }] =
    useCreateMessageMutation();

  let messages: MessageData[] =
    data?.chatMessages?.edges?.map((x) => x.node) ?? [];

  const groupedMessages: MessageData[][] = groupMessages(messages);

  const messageComponents = groupedMessages
    .map((group) => {
      const isCurrentUser = group[0].createdBy.id === meData?.me.id;
      return group
        .map((message, idx) => {
          const isLastMessageInGroup = idx < group.length - 1;
          return (
            <motion.div
              key={message.id}
              variants={{
                hidden: {
                  x: isCurrentUser ? 200 : -200,
                },
                show: {
                  x: 0,
                },
              }}
              style={{
                display: 'flex',
                justifyContent: isCurrentUser ? 'right' : 'left',
                overflowX: 'hidden',
              }}
            >
              <Message
                {...message}
                isSelected={message.id === selectedMessageId}
                onClick={() =>
                  setSelectedMessageId(
                    message.id === selectedMessageId ? null : message.id
                  )
                }
                showAvatar={!isLastMessageInGroup && !isCurrentUser}
                variant={isCurrentUser ? 'light' : 'default'}
              />
            </motion.div>
          );
        })
        .flat();
    })
    .flat();

  let topMessage = null;
  if (!isLoadingMessages) {
    if (messages.length === 0) {
      topMessage = 'no messages';
    } else if (!hasPreviousPage) {
      topMessage = 'start of conversation';
    }
  }

  return (
    <Stack
      style={{
        height: 'calc(100vh - 110px)',
        position: 'relative',
      }}
      spacing={'sm'}
    >
      {messagesError || meError ? (
        <Center>Failed to load messages</Center>
      ) : messages.length === 0 && !(isLoadingMessages || isLoadingMeData) ? (
        <Center
          style={{
            height: '100%',
          }}
        >
          <Text>No Messages</Text>
        </Center>
      ) : (
        <Scroller
          isLoading={isLoadingMessages || isLoadingMeData}
          isLoadingMore={isFetchingMore}
          topMessage={topMessage}
          onScroll={({ percentage }) => {
            if (percentage > 90 && hasPreviousPage && !isFetchingMore) {
              setIsFetchingMore(true);
              fetchMore({
                variables: {
                  chatId,
                  last: 20,
                  before: data.chatMessages.pageInfo.startCursor,
                },
              }).finally(() => setIsFetchingMore(false));
            }
          }}
        >
          {messageComponents}
        </Scroller>
      )}
      <ChatInput
        isLoading={loadingCreateMessage}
        isDisabled={!!messagesError || !!meError}
        onSubmit={({ content }) =>
          createMessageMutation({
            variables: {
              chatId,
              content: content,
            },
          }).then((x) => !!!x.errors)
        }
      />
    </Stack>
  );
};

export default ChatPanel;
