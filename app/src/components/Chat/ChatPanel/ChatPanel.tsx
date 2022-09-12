import { gql } from '@apollo/client';
import { Center, Stack, Text } from '@mantine/core';
import ChatInput from './ChatInput';
import Scroller from 'components/shared/Scroller/Scroller';
import { useCreateMessage } from './useCreateMessage';
import { useEvents } from './useEvents';
import EventContainer from './Event/EventContainer';
import { Message } from './Event/Message';
import { useParams } from 'react-router-dom';
import { ChatUpdate } from './Event/ChatUpdate';

gql`
  query GetEvents($chatId: HashId!, $last: Int, $before: String) {
    events(chatId: $chatId, last: $last, before: $before) {
      pageInfo {
        hasPreviousPage
        startCursor
      }
      edges {
        node {
          ...ChatPanelEvent
        }
      }
    }
  }
  subscription Events($chatId: HashId) {
    events(chatId: $chatId) {
      ...ChatPanelEvent
    }
  }
  fragment ChatPanelEvent on Event {
    id
    createdAt
    createdBy {
      id
    }
    ...EventContainer
    ...MessageEvent
    ... on ChatUpdate {
      ...ChatUpdateEvent
    }
  }
  ${EventContainer.fragments.event}
  ${Message.fragments.message}
  ${ChatUpdate.fragments.chatUpdate}
`;

const ChatPanel = () => {
  const { chatId } = useParams();
  const { events, hasPreviousPage, loading, error, isFetchingMore, fetchMore } =
    useEvents({ chatId });
  const { createMessage } = useCreateMessage({ chatId });

  let topMessage = null;
  if (!loading) {
    if (events.length === 0) {
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
      ) : events.length === 0 && !loading ? (
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
          {events.map((event) => (
            <EventContainer
              key={event.createdAt}
              displayEventTime={event.displayEventTime}
              eventData={event}
              event={
                event.__typename === 'DeletedEvent' ||
                event.__typename === 'Message' ? (
                  <Message
                    displayAvatar={event.isLastEventInGroup}
                    message={event}
                  />
                ) : (
                  <></>
                )
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
