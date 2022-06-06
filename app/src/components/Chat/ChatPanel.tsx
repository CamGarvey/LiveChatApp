import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Center,
  Grid,
  InputWrapper,
  LoadingOverlay,
  Popover,
  ScrollArea,
  Stack,
  Text,
  Textarea,
} from '@mantine/core';
import {
  GetNewMessagesDocument,
  useCreateMessageMutation,
  useGetChannelMessagesQuery,
  useGetMeQuery,
} from '../../graphql/generated/graphql';
import MessageGroup from './MessageGroup';
import { useEffect, useRef, useState } from 'react';

const MIN_HEIGHT_BEFORE_AUTO_SCROLL = 300;

type Props = {
  channelId?: string;
};

export const ChatPanel = ({ channelId }: Props) => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isAutoScrollingDown, setIsAutoScrollingDown] = useState(false);
  const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });
  const [scrollToBottomPopoverOpened, setScrollToBottomPopoverOpened] =
    useState(false);
  const messageViewport = useRef<HTMLDivElement>();

  // Get info about current user
  const { data: meData, loading: loadingMeData } = useGetMeQuery();

  const { loading, data, error, subscribeToMore, fetchMore } =
    useGetChannelMessagesQuery({
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

  const scrollToBottom = () => {
    setIsAutoScrollingDown(true);
    messageViewport.current.scrollTo({
      top: messageViewport.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  // Scroll to the bottom of the page on load of messages
  useEffect(() => {
    const element = messageViewport.current;
    const height = element.scrollHeight - element.offsetHeight;
    if (scrollPosition.y > height - 80) {
      scrollToBottom();
    }
    if (isFirstLoad && data) {
      scrollToBottom();
      setIsFirstLoad(false);
    }
  }, [data?.channelMessages?.edges, isFirstLoad]);

  // Handle scrolling to bottom popper
  useEffect(() => {
    const element = messageViewport.current;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      setScrollToBottomPopoverOpened(false);
      setIsAutoScrollingDown(false);
    }
    const height = element.scrollHeight - element.offsetHeight;
    if (
      height > MIN_HEIGHT_BEFORE_AUTO_SCROLL &&
      scrollPosition.y <= height / 2 && // higher than halfway
      !isAutoScrollingDown // not already auto scrolling
    ) {
      setScrollToBottomPopoverOpened(true);
    }

    // Reached top
    if (scrollPosition.y === 0 && hasPreviousPage && !isFirstLoad) {
      fetchMore({
        variables: {
          channelId,
          last: 20,
          before: data.channelMessages.pageInfo.startCursor,
        },
      });
    }
  }, [
    scrollPosition.y,
    channelId,
    isAutoScrollingDown,
    hasPreviousPage,
    fetchMore,
    data?.channelMessages?.pageInfo.startCursor,
    isFirstLoad,
  ]);

  let messages = data?.channelMessages?.edges?.map((x) => x.node) ?? [];

  // setTopMessage(messages[0]);

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

  const formik = useFormik({
    initialValues: {
      content: '',
    },
    validationSchema: createMessageSchema,
    onSubmit: (values) => {
      createMessageMutation({
        variables: {
          channelId,
          content: values.content,
        },
      }).then(() => {
        formik.resetForm();
      });
    },
  });

  if (error) {
    return <>Error loading messages</>;
  }

  return (
    <Stack
      style={{
        height: 'calc(100vh - 110px)',
        position: 'relative',
      }}
    >
      <LoadingOverlay
        visible={loading || loadingMeData}
        loaderProps={{ size: 'lg', variant: 'bars' }}
      />

      {messages.length === 0 && !(loading || loadingMeData) && (
        <Center
          style={{
            height: '100%',
          }}
        >
          <Text>No Messages</Text>
        </Center>
      )}
      <ScrollArea
        sx={{ flex: 1 }}
        onScrollPositionChange={onScrollPositionChange}
        viewportRef={messageViewport}
        pr={'30px'} // Make room for scrollbar
      >
        <Stack spacing={'sm'} mb={'5px'}>
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
      </ScrollArea>

      <Popover
        opened={scrollToBottomPopoverOpened}
        onClose={() => setScrollToBottomPopoverOpened(false)}
        width={'100%'}
        position="top"
        styles={{
          inner: {
            padding: 3,
            cursor: 'pointer',
          },
        }}
        target={
          <form style={{ marginTop: 'auto' }} onSubmit={formik.handleSubmit}>
            <Grid columns={6}>
              <Grid.Col span={5}>
                <InputWrapper required>
                  <Textarea
                    id="content"
                    onChange={formik.handleChange}
                    value={formik.values.content}
                    autosize
                    minRows={2}
                    maxRows={4}
                  />
                </InputWrapper>
              </Grid.Col>
              <Grid.Col span={1}>
                <Button
                  type="submit"
                  loading={loadingCreateMessage}
                  disabled={error != null || loading}
                  fullWidth={true}
                >
                  Send
                </Button>
              </Grid.Col>
            </Grid>
          </form>
        }
        withArrow
      >
        <Text
          align="center"
          onClick={() => {
            scrollToBottom();
            setScrollToBottomPopoverOpened(false);
          }}
        >
          Scroll To Bottom
        </Text>
      </Popover>
    </Stack>
  );
};

const createMessageSchema = Yup.object().shape({
  content: Yup.string()
    .min(1, 'Content Required!')
    .required('Name is required'),
});

export default ChatPanel;
