import { Center, Stack, Text } from '@mantine/core';
import {
  GetMessagesDocument,
  GetMessagesQuery,
  MessagesDocument,
  useCreateMessageMutation,
  useGetMessagesQuery,
} from '../../graphql/generated/graphql';
import { useEffect, useState } from 'react';
import Scroller from './Scroller';
import ChatInput from './ChatInput';
import Message from './Message';
import { groupMessages } from '../../util';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';

type Props = {
  chatId: string;
};

export const ChatPanel = ({ chatId }: Props) => {
  const { user } = useUser();
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  const {
    loading: isLoadingMessages,
    data,
    error: messagesError,
    subscribeToMore,
    fetchMore,
  } = useGetMessagesQuery({
    variables: {
      chatId,
      last: 20,
    },
    fetchPolicy: 'cache-first',
  });

  const hasPreviousPage = data?.messages?.pageInfo?.hasPreviousPage ?? false;

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: MessagesDocument,
      variables: {
        chatId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const message = subscriptionData.data.messages;
        const newCache = Object.assign({}, prev, {
          messages: {
            edges: [
              ...prev.messages.edges,
              {
                __typename: 'MessageEdge',
                node: message,
              },
            ],
            pageInfo: prev.messages.pageInfo,
          },
        });
        return newCache;
      },
    });
    return () => unsubscribe();
  }, [chatId, subscribeToMore]);

  const [createMessageMutation, { loading: loadingCreateMessage }] =
    useCreateMessageMutation();

  let messages = data?.messages?.edges?.map((x) => x.node) ?? [];

  const groupedMessages = groupMessages(messages);

  const messageComponents = groupedMessages
    .map((group) => {
      return group
        .map((message: any, idx: number) => {
          const isLastMessageInGroup = idx < group.length - 1;
          return (
            <motion.div
              key={message.id}
              variants={{
                hidden: {
                  x: message.isCreator ? 200 : -200,
                },
                show: {
                  x: 0,
                },
              }}
              style={{
                display: 'flex',
                justifyContent: message.isCreator ? 'right' : 'left',
                overflowX: 'hidden',
              }}
            >
              <Message
                {...message}
                // sending={true}
                isSelected={message.id === selectedMessageId}
                onClick={() =>
                  setSelectedMessageId(
                    message.id === selectedMessageId ? null : message.id
                  )
                }
                showAvatar={!isLastMessageInGroup && !message.isCreator}
                variant={message.isCreator ? 'light' : 'default'}
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
      {messagesError ? (
        <Center>Failed to load messages</Center>
      ) : messages.length === 0 && !isLoadingMessages ? (
        <Center
          style={{
            height: '100%',
          }}
        >
          <Text>No Messages</Text>
        </Center>
      ) : (
        <Scroller
          isLoading={isLoadingMessages}
          isLoadingMore={isFetchingMore}
          topMessage={topMessage}
          onScroll={({ percentage }) => {
            if (percentage > 90 && hasPreviousPage && !isFetchingMore) {
              setIsFetchingMore(true);
              fetchMore({
                variables: {
                  chatId,
                  last: 20,
                  before: data.messages.pageInfo.startCursor,
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
        isDisabled={!!messagesError}
        onSubmit={({ content }) =>
          createMessageMutation({
            variables: {
              chatId,
              content: content,
            },
            optimisticResponse: ({ content }) => {
              return {
                createMessage: {
                  __typename: 'InstantMessage',
                  id: 'temp-id',
                  isCreator: true,
                  createdAt: new Date().getTime(),
                  content,
                },
              };
            },
            update: (cache, { data }) => {
              console.log({ data });

              const result = cache.readQuery<GetMessagesQuery>({
                query: GetMessagesDocument,
                variables: {
                  chatId,
                },
              });

              cache.writeQuery<GetMessagesQuery>({
                query: GetMessagesDocument,
                variables: {
                  chatId,
                },
                data: {
                  messages: {
                    pageInfo: result.messages.pageInfo,
                    edges: [
                      ...result.messages.edges,
                      {
                        node: {
                          __typename: 'InstantMessage',
                          createdBy: {
                            __typename: 'Me',
                            ...user,
                          },
                          ...data.createMessage,
                        },
                      },
                    ],
                  },
                },
              });
            },
          }).then((x) => !!!x.errors)
        }
      />
    </Stack>
  );
};

export default ChatPanel;
