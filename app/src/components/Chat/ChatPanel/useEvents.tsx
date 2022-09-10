import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { groupEvents } from 'utils';
import {
  EventsDocument,
  EventsSubscription,
  useGetEventsQuery,
} from 'graphql/generated/graphql';

type Props = {
  chatId: string;
};

export const useEvents = ({ chatId }: Props) => {
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const {
    loading,
    data,
    error,
    subscribeToMore,
    fetchMore: fetchMoreEvents,
  } = useGetEventsQuery({
    variables: {
      chatId,
      last: 20,
    },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    const unsubscribe = subscribeToMore<EventsSubscription>({
      document: EventsDocument,
      variables: {
        chatId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const event = subscriptionData.data.events;
        if (event.__typename === 'DeletedEvent') {
          return prev;
        }
        const newCache = Object.assign({}, prev, {
          events: {
            edges: [
              ...prev.events.edges,
              {
                __typename: 'EventEdge',
                node: event,
              },
            ],
            pageInfo: prev.events.pageInfo,
          },
        });
        return newCache;
      },
    });
    return () => unsubscribe();
  }, [chatId, subscribeToMore]);

  const hasPreviousPage = data?.events?.pageInfo?.hasPreviousPage ?? false;
  let rawEvents = data?.events?.edges?.map((x) => x.node) ?? [];
  const groupedEvents = groupEvents(rawEvents);

  const shouldDisplayEventTime = useCallback(
    (
      currentEventTime: moment.Moment,
      eventIndex: number,
      previousEventTime: moment.Moment | undefined,
      groupLength: number
    ) => {
      if (previousEventTime === undefined) return true;
      if (groupLength >= 5 && eventIndex === 4) return true;
      return Math.abs(currentEventTime.diff(previousEventTime, 'minutes')) > 2;
    },
    []
  );

  let previousEventTime: moment.Moment | undefined;
  const events = groupedEvents
    .map((group) =>
      group
        .map((event, eventIndex: number) => {
          const isLastEventInGroup = eventIndex === group.length - 1;
          const currentEventTime = moment(event.createdAt);
          const displayEventTime = shouldDisplayEventTime(
            currentEventTime,
            eventIndex,
            previousEventTime,
            group.length
          );

          // Set previous time
          previousEventTime = currentEventTime;

          return {
            displayEventTime,
            isLastEventInGroup,
            ...event,
          };
        })
        .flat()
    )
    .flat();

  const fetchMore = () => {
    setIsFetchingMore(true);
    fetchMoreEvents({
      variables: {
        chatId,
        last: 20,
        before: data.events.pageInfo.startCursor,
      },
    }).finally(() => setIsFetchingMore(false));
  };

  return {
    events,
    loading,
    error,
    hasPreviousPage,
    fetchMore,
    isFetchingMore,
  };
};
