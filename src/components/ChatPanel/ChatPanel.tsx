import { gql } from '@apollo/client';
import { Center, Stack, Text } from '@mantine/core';
import ChatInput from './ChatInput';
import Scroller from './Scroller';
import EventContainer from './Event/EventContainer';
import DeletedEvent from './Event/DeletedEvent';
import ChatHeader from './ChatHeader';
import { useMediaQuery } from '@mantine/hooks';
import { useCreateMessage, useEvents } from './hooks';
import { CreatedEvent } from './Event/CreatedEvent/CreatedEvent';

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
  subscription Events {
    events {
      ...ChatPanelEvent
    }
  }
  fragment ChatPanelEvent on Event {
    id
    createdAt
    createdBy {
      id
    }
    ...CreatedEventComponent
    ...EventContainer
    ...DeletedEventComponent
  }
  fragment ChatPanelChat on Chat {
    ...ChatHeaderChat
  }
  ${EventContainer.fragments.event}
  ${CreatedEvent.fragments.event}
  ${DeletedEvent.fragments.event}
`;

type Props = {
  chatId: string;
};

const ChatPanel = ({ chatId }: Props) => {
  const isSmallerThanMedScreen = useMediaQuery('(max-width: 780px)');
  const { events, hasPreviousPage, loading, error, isFetchingMore, fetchMore } =
    useEvents({ chatId });
  const { createMessage } = useCreateMessage({ chatId });

  let topMessage: string = '';
  if (!loading) {
    if (events.length === 0) {
      topMessage = 'no messages';
    } else if (!hasPreviousPage) {
      topMessage = 'start of conversation';
    }
  }

  return (
    <div>
      {!isSmallerThanMedScreen && <ChatHeader chatId={chatId} />}
      <Stack
        style={{
          height: `calc(100vh - ${isSmallerThanMedScreen ? 70 : 130}px)`,
          position: 'relative',
        }}
        spacing={4}
        p={'sm'}
        pt={0}
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
                  <>
                    {event.__typename === 'CreatedEvent' && (
                      <CreatedEvent
                        displayAvatar={event.isLastEventInGroup}
                        event={event}
                      />
                    )}
                    {event.__typename === 'DeletedEvent' && (
                      <DeletedEvent
                        displayAvatar={event.isLastEventInGroup}
                        event={event}
                      />
                    )}
                  </>
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
    </div>
  );
};

export default ChatPanel;
