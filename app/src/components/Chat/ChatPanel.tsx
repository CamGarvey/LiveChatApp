import { Center, Stack, Text } from '@mantine/core';
import {
  GetMessagesDocument,
  GetMessagesQuery,
  MessagesDocument,
  useCreateMessageMutation,
  useGetMessagesQuery,
} from '../../graphql/generated/graphql';
import { useCallback, useEffect, useState } from 'react';
import Scroller from './Scroller';
import ChatInput from './ChatInput';
import Message from './Message';
import { getMessageTime, groupMessages } from '../../util';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';
import moment from 'moment';

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
  const [createMessageMutation] = useCreateMessageMutation();

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

  let messages = data?.messages?.edges?.map((x) => x.node) ?? [];

  const groupedMessages = groupMessages(messages);

  const shouldShowMessageTime = useCallback(
    (previousMessage: moment.Moment, currentMessage: moment.Moment) =>
      Math.abs(currentMessage.diff(previousMessage, 'minutes')) > 10,
    []
  );

  const messageComponents = groupedMessages
    .map((group) => {
      let previousMessageTime: moment.Moment | undefined;
      return group
        .map((message, messageIndex: number) => {
          const isLastMessageInGroup = messageIndex === group.length - 1;
          const currentMessageTime = moment(message.createdAt);
          const shouldShowTime =
            previousMessageTime === undefined || isLastMessageInGroup
              ? true
              : shouldShowMessageTime(previousMessageTime, currentMessageTime);

          // Set previous time
          previousMessageTime = currentMessageTime;
          return (
            <>
              {shouldShowTime && (
                <Center>
                  <Text color={'dimmed'}>
                    {getMessageTime(currentMessageTime)}
                  </Text>
                </Center>
              )}
              <motion.div
                key={message.createdAt}
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
                  content={
                    message.__typename === 'InstantMessage'
                      ? message.content
                      : 'Deleted Message'
                  }
                  sending={(message.id as string).startsWith('temp-id')} // temp-id == no message created mutation
                  onClick={() =>
                    setSelectedMessageId(
                      message.id === selectedMessageId ? null : message.id
                    )
                  }
                  hideAvatar={!isLastMessageInGroup || message.isCreator}
                  variant={message.isCreator ? 'light' : 'default'}
                  direction={message.isCreator ? 'rtl' : 'ltr'}
                />
              </motion.div>
            </>
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
        isDisabled={!!messagesError}
        onSubmit={({ content }) => {
          const createdAt = new Date().getTime();

          createMessageMutation({
            variables: {
              chatId,
              content: content,
            },
            optimisticResponse: ({ content }) => {
              const id = `temp-id.${createdAt}`;

              return {
                createMessage: {
                  __typename: 'InstantMessage',
                  id,
                  createdAt,
                  content,
                  isCreator: true,
                },
              };
            },

            update: (cache, { data }) => {
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
                          createdAt,
                        },
                      },
                    ],
                  },
                },
              });
            },
          });
        }}
      />
    </Stack>
  );
};

export default ChatPanel;
