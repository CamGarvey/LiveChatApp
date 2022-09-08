import {
  MessagesDocument,
  MessagesSubscription,
  useGetMessagesQuery,
} from 'graphql/generated/graphql';
import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { groupMessages } from 'utils';

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
    fetchMore: fetchMoreMessages,
  } = useGetMessagesQuery({
    variables: {
      chatId,
      last: 20,
    },
    fetchPolicy: 'cache-and-network',
  });

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

  const hasPreviousPage = data?.messages?.pageInfo?.hasPreviousPage ?? false;
  let rawMessages = data?.messages?.edges?.map((x) => x.node) ?? [];
  const groupedMessages = groupMessages(rawMessages);

  const shouldDisplayMessageTime = useCallback(
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
  const messages = groupedMessages
    .map((group) =>
      group
        .map((message, messageIndex: number) => {
          const isLastMessageInGroup = messageIndex === group.length - 1;
          const currentMessageTime = moment(message.createdAt);
          const displayEventTime = shouldDisplayMessageTime(
            currentMessageTime,
            messageIndex,
            previousMessageTime,
            group.length
          );

          // Set previous time
          previousMessageTime = currentMessageTime;

          return {
            displayEventTime,
            isLastMessageInGroup,
            ...message,
          };
        })
        .flat()
    )
    .flat();

  const fetchMore = () => {
    setIsFetchingMore(true);
    fetchMoreMessages({
      variables: {
        chatId,
        last: 20,
        before: data.messages.pageInfo.startCursor,
      },
    }).finally(() => setIsFetchingMore(false));
  };

  return {
    messages,
    loading,
    error,
    hasPreviousPage,
    fetchMore,
    isFetchingMore,
  };
};
