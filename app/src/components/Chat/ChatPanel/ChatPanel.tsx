import { gql } from '@apollo/client';
import { Center, Stack, Text } from '@mantine/core';
import ChatInput from './ChatInput';
import Scroller from 'components/shared/Scroller/Scroller';
import { useCreateMessage } from './useCreateMessage';
import { useEvents } from './useMessages';
import EventContainer from './Event/EventContainer';
import { Message } from './Event/Message';
import { useParams } from 'react-router-dom';

gql`
  query GetEvents($chatId: HashId!, $last: Int, $before: String) {
    events(chatId: $chatId, last: $last, before: $before) {
      pageInfo {
        hasPreviousPage
        startCursor
      }
      edges {
        node {
          ...ChatPanelMessage
          ...UseEvent
        }
      }
    }
  }
  subscription Messages($chatId: HashId) {
    messages(chatId: $chatId) {
      ...ChatPanelMessage
      ...UseEvent
    }
  }
  fragment UseEventEvent on Event {
    id
    createdAt
    createdBy {
      id
    }
  }
  fragment UseEvent on Event {
    ... on Message {
      id
      ...UseEventEvent
    }
    ... on DeletedMessage {
      id
      ...UseEventEvent
    }
  }
  fragment ChatPanelMessage on Event {
    id
    ...EventContainer
    ...MessageEvent
    createdAt
  }
  ${EventContainer.fragments.event}
  ${Message.fragments.message}
`;

const ChatPanel = () => {
  const { chatId } = useParams();
  const {
    messages,
    hasPreviousPage,
    loading,
    error,
    isFetchingMore,
    fetchMore,
  } = useEvents({ chatId });
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

export default ChatPanel;
