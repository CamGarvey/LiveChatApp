import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Grid,
  InputWrapper,
  Popover,
  ScrollArea,
  Stack,
  Text,
  Textarea,
} from '@mantine/core';
import {
  useCreateMessageMutation,
  useGetChannelMessagesQuery,
  useGetMeQuery,
  useGetNewMessagesSubscription,
} from '../../graphql/generated/graphql';
import MessageGroup from './MessageGroup';
import { useEffect, useRef, useState } from 'react';
import MessageItem from '../../models/message-item';

type Props = {
  channelId?: number;
};

export const Chat = ({ channelId }: Props) => {
  const [messages, setMessages] = useState([]);
  const [groupedMessages, setGroupedMessages] = useState<MessageItem[][]>([]);
  const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });
  const [scrollToBottomPopoverOpened, setScrollToBottomPopoverOpened] =
    useState(false);
  const messageViewport = useRef<HTMLDivElement>();

  const { loading, data, error, fetchMore } = useGetChannelMessagesQuery({
    variables: {
      channelId,
      last: 20,
    },
    fetchPolicy: 'network-only',
  });

  const [createMessageMutation, { loading: loadingCreateMessage }] =
    useCreateMessageMutation();

  const { data: newMessageData } = useGetNewMessagesSubscription({
    variables: {
      channelId,
    },
  });

  const scrollToBottom = () =>
    messageViewport.current.scrollTo({
      top: messageViewport.current.scrollHeight,
      behavior: 'smooth',
    });

  useEffect(() => {
    setMessages([]);
  }, [channelId]);

  // Handle scrolling to bottom popper
  useEffect(() => {
    const element = messageViewport.current;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      setScrollToBottomPopoverOpened(false);
    }
    if (scrollPosition.y <= 0) {
      setScrollToBottomPopoverOpened(true);
    }
  }, [scrollPosition.y, fetchMore, channelId]);

  // Scroll to the bottom of the page on load of messages
  useEffect(() => {
    scrollToBottom();
  }, [groupedMessages]);

  useEffect(() => {
    if (newMessageData) {
      setMessages((prev) => [...prev, newMessageData.newMessage.message]);
    }
  }, [newMessageData]);

  useEffect(() => {
    if (messages) {
      setGroupedMessages(
        messages.reduce((prev, curr) => {
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
        }, [])
      );
    }
  }, [messages]);

  useEffect(() => {
    if (data) {
      const messages = data.channelMessages.edges.map((x) => x.node).reverse();
      setMessages((prev) => [...prev, ...messages]);
    }
  }, [data]);

  const formik = useFormik({
    initialValues: {
      content: '',
    },
    validationSchema: createMessageSchema,
    onSubmit: (values) => {
      createMessageMutation({
        variables: {
          channelId: 1,
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
        height: 'calc(100vh - 105px)',
      }}
    >
      <ScrollArea
        sx={{ flex: 1 }}
        onScrollPositionChange={onScrollPositionChange}
        viewportRef={messageViewport}
      >
        <Stack spacing={'sm'}>
          {groupedMessages.map((group, idx) => (
            <MessageGroup key={idx} messages={group} />
          ))}
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
                  loading={loading || loadingCreateMessage}
                  disabled={error != null}
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

export default Chat;
