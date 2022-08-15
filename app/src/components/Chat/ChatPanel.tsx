import { Center, Stack, Text } from '@mantine/core';
import {
  GetMessagesDocument,
  GetMessagesQuery,
  MessagesDocument,
  MessagesSubscription,
  useCreateMessageMutation,
  useGetMessagesQuery,
} from 'graphql/generated/graphql';
import { useCallback, useEffect, useState } from 'react';
import Scroller from './Scroller/Scroller';
import ChatInput from './ChatInput';
import { motion } from 'framer-motion';
import moment from 'moment';
import Message from './Event/Message/Message';
import { useUser } from 'context/UserContext';
import { formatMessageTime, groupMessages } from 'utils';
import EventTime from './Event/EventTime';
import EventContainer from './Event/EventContainer';

type Props = {
  chatId: string;
};

export const ChatPanel = ({ chatId }: Props) => {
  const { user } = useUser();
  const [isFetchingMore, setIsFetchingMore] = useState(false);

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
    fetchPolicy: 'cache-and-network',
  });
  const [createMessageMutation] = useCreateMessageMutation();

  const hasPreviousPage = data?.messages?.pageInfo?.hasPreviousPage ?? false;

  useEffect(() => {
    const unsubscribe = subscribeToMore<MessagesSubscription>({
      document: MessagesDocument,
      variables: {
        chatId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const message = subscriptionData.data.messages;
        if (message.__typename === 'DeletedMessage') {
          return prev;
        }
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
    (
      currentMessageTime: moment.Moment,
      messageIndex: number,
      previousMessageTime: moment.Moment | undefined,
      groupLength: number
    ) => {
      if (previousMessageTime === undefined) return true;
      if (groupLength >= 5 && messageIndex === 4) return true;
      return (
        Math.abs(currentMessageTime.diff(previousMessageTime, 'minutes')) > 2
      );
    },
    []
  );

  let previousMessageTime: moment.Moment | undefined;
  const messageComponents = groupedMessages
    .map((group) =>
      group
        .map((message, messageIndex: number) => {
          const isLastMessageInGroup = messageIndex === group.length - 1;
          const currentMessageTime = moment(message.createdAt);
          const shouldShowTime = shouldShowMessageTime(
            currentMessageTime,
            messageIndex,
            previousMessageTime,
            group.length
          );

          // Set previous time
          previousMessageTime = currentMessageTime;
          return (
            <EventContainer
              key={message.createdAt}
              displayEventTime={shouldShowTime}
              eventData={message}
              event={
                <Message data={message} displayAvatar={isLastMessageInGroup} />
              }
            />
          );
        })
        .flat()
    )
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
              content,
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
                  createdBy: user,
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
                          content,
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
