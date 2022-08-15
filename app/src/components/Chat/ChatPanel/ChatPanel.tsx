import { Center, Stack, Text } from '@mantine/core';
import {
  GetMessagesDocument,
  GetMessagesQuery,
  MessagesDocument,
  MessagesSubscription,
  useCreateMessageMutation,
  useGetMessagesQuery,
} from 'graphql/generated/graphql';
import { useEffect, useState } from 'react';
import Scroller from '../Scroller/Scroller';
import ChatInput from '../ChatInput';
import Message from '../Event/Message/Message';
import { useUser } from 'context/UserContext';
import EventContainer from '../Event/EventContainer';
import { useMessages } from './useMessages';
import { useCreateMessage } from './useCreateMessage';

type Props = {
  chatId: string;
};

export const ChatPanel = ({ chatId }: Props) => {
  const {
    messages,
    hasPreviousPage,
    loading,
    error,
    isFetchingMore,
    fetchMore,
  } = useMessages({ chatId });
  const { createMessage } = useCreateMessage({ chatId });

  let topMessage = null;
  if (!loading) {
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
      {error ? (
        <Center>Failed to load messages</Center>
      ) : messages.length === 0 && !loading ? (
        <Center
          style={{
            height: '100%',
          }}
        >
          <Text>No Messages</Text>
        </Center>
      ) : (
        <Scroller
          isLoading={loading}
          isLoadingMore={isFetchingMore}
          topMessage={topMessage}
          onScroll={({ percentage }) => {
            if (percentage > 90 && hasPreviousPage && !isFetchingMore) {
              fetchMore();
            }
          }}
        >
          {messages.map((message) => (
            <EventContainer
              key={message.createdAt}
              displayEventTime={message.displayEventTime}
              eventData={message}
              event={
                <Message
                  displayAvatar={message.isLastMessageInGroup}
                  data={message}
                />
              }
            />
          ))}
        </Scroller>
      )}
      <ChatInput
        isDisabled={!!error}
        onSubmit={({ content }) => createMessage(content)}
      />
    </Stack>
  );
};

export default ChatPanel;
