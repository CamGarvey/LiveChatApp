import { gql } from '@apollo/client';
import { Center, Stack, Text } from '@mantine/core';
import ChatInput from '../ChatInput';
import EventContainer from '../Event/EventContainer';
import Message from '../Event/Message/Message';
import Scroller from '../Scroller/Scroller';
import { useCreateMessage } from './useCreateMessage';
import { useMessages } from './useMessages';

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
        <Center
          style={{
            height: '100%',
          }}
        >
          <Text>Failed to load messages</Text>
        </Center>
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
          key={chatId}
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
                  message={message}
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

ChatPanel.fragments = {
  message: gql`
    fragment ChatPanelMessage on Event {
      ...EventContainer
      ...MessageEvent
      createdAt
    }
    ${EventContainer.fragments.event}
    ${Message.fragments.message}
  `,
};

export default ChatPanel;
