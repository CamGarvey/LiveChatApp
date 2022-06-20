import {
  Center,
  Container,
  Loader,
  LoadingOverlay,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import {
  GetNewMessagesDocument,
  useCreateMessageMutation,
  useGetChannelMessagesQuery,
  useGetMeQuery,
} from '../../graphql/generated/graphql';
import MessageGroup from './MessageGroup';
import { useEffect, useState } from 'react';
import Scroller from './Scroller';
import ChatInput from './ChatInput';

type Props = {
  channelId: string;
};

export const ChatPanel = ({ channelId }: Props) => {
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  // Get info about current user
  const {
    data: meData,
    loading: isLoadingMeData,
    error: meError,
  } = useGetMeQuery();

  const {
    loading: isLoadingMessages,
    data,
    error: messagesError,
    subscribeToMore,
    fetchMore,
  } = useGetChannelMessagesQuery({
    variables: {
      channelId,
      last: 20,
    },
    fetchPolicy: 'network-only',
  });

  const hasPreviousPage =
    data?.channelMessages?.pageInfo?.hasPreviousPage ?? false;

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: GetNewMessagesDocument,
      variables: {
        channelId,
      },
      updateQuery: (prev, { subscriptionData }: any) => {
        if (!subscriptionData.data) return prev;
        const subscriptionResponse = subscriptionData.data.newMessage.message;
        const newCache = Object.assign({}, prev, {
          channelMessages: {
            edges: [
              ...prev.channelMessages.edges,
              {
                node: subscriptionResponse,
                __typename: 'MessageEdge',
              },
            ],
            pageInfo: prev.channelMessages.pageInfo,
          },
        });
        return newCache;
      },
    });
    return () => unsubscribe();
  }, [channelId, subscribeToMore]);

  const [createMessageMutation, { loading: loadingCreateMessage }] =
    useCreateMessageMutation();

  let messages = data?.channelMessages?.edges?.map((x) => x.node) ?? [];

  const groupedMessages = messages.reduce((prev, curr) => {
    if (prev.length === 0) {
      prev.push([curr]);
      return prev;
    }
    if (prev[prev.length - 1][0].createdBy.id === curr.createdBy.id) {
      prev[prev.length - 1].push(curr);
    } else {
      prev.push([curr]);
    }
    return prev;
  }, []);

  return (
    <Stack
      style={{
        height: 'calc(100vh - 110px)',
        position: 'relative',
      }}
      spacing={'sm'}
    >
      <LoadingOverlay
        visible={isLoadingMessages || isLoadingMeData}
        loaderProps={{ size: 'lg', variant: 'bars' }}
      />

      {messagesError || meError ? (
        <Center>Failed to load messages</Center>
      ) : (
        <>
          {messages.length === 0 && !(isLoadingMessages || isLoadingMeData) && (
            <Center
              style={{
                height: '100%',
              }}
            >
              <Text>No Messages</Text>
            </Center>
          )}
          <Scroller
            onScroll={({ percentage }) => {
              if (percentage > 90 && hasPreviousPage && !isFetchingMore) {
                setIsFetchingMore(true);
                fetchMore({
                  variables: {
                    channelId,
                    last: 20,
                    before: data.channelMessages.pageInfo.startCursor,
                  },
                }).finally(() => setIsFetchingMore(false));
              }
            }}
          >
            <Stack spacing={'sm'} mb={'5px'}>
              {isFetchingMore && (
                <Center>
                  <Loader variant="bars" />
                </Center>
              )}
              {groupedMessages.map((group, idx) => {
                const isCurrentUser = group[0].createdBy.id === meData?.me.id;
                return (
                  <MessageGroup
                    key={idx}
                    messages={group}
                    showAvatar={!isCurrentUser}
                    style={{
                      justifyContent: isCurrentUser && 'right',
                    }}
                  />
                );
              })}
            </Stack>
          </Scroller>
        </>
      )}

      {!isLoadingMessages && (
        <ChatInput
          isLoading={loadingCreateMessage}
          isDisabled={!!messagesError || !!meError}
          onSubmit={({ content }) =>
            createMessageMutation({
              variables: {
                channelId,
                content: content,
              },
            })
          }
        />
      )}
    </Stack>
  );
};

export default ChatPanel;
