import { gql } from '@apollo/client';
import { Center, Stack, Text } from '@mantine/core';
import ChatInput from './ChatInput';
import Scroller from 'components/shared/Scroller/Scroller';
import { useCreateMessage } from './useCreateMessage';
import { useMessages } from './useMessages';
import EventContainer from './Event/EventContainer';
import { Message } from './Event/Message';

gql`
  query GetMessages($chatId: HashId!, $last: Int, $before: String) {
    messages(chatId: $chatId, last: $last, before: $before) {
      pageInfo {
        hasPreviousPage
        startCursor
      }
      edges {
        node {
          ...ChatPanelMessage
          ...UseMessage
        }
      }
    }
  }
  subscription Messages($chatId: HashId) {
    messages(chatId: $chatId) {
      ...ChatPanelMessage
      ...UseMessage
    }
  }
  fragment UseMessageEvent on Event {
    id
    createdAt
    createdBy {
      id
    }
  }
  fragment UseMessage on MessageResult {
    ... on Message {
      id
      ...UseMessageEvent
    }
    ... on DeletedMessage {
      id
      ...UseMessageEvent
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

type Props = {
  chatId: string;
};

const ChatPanel = ({ chatId }: Props) => {
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

export default ChatPanel;
