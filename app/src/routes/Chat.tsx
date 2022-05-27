import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Grid,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import CreateChannelModal from '../components/CreateChannelModal/CreateChannelModal';
import Sidebar from '../components/Sidebar/Sidebar';
import moment from 'moment';
import {
  useCreateMessageMutation,
  useGetChannelMessagesQuery,
} from '../graphql/generated/graphql';
import { useFormik } from 'formik';
import * as Yup from 'yup';

type User = {
  id: number;
  username: string;
  name?: string;
};

type MessageItem = {
  id: number;
  content: string;
  createdAt: number;
  createdBy: User;
};

type MessageProps = MessageItem & {
  onClick?: () => void;
  isInfoShown?: boolean;
};

const Message = ({
  content,
  createdBy,
  createdAt,
  onClick,
  isInfoShown = false,
}: MessageProps) => {
  return (
    <Box>
      {isInfoShown && (
        <Flex placeContent={'space-between'}>
          <Text fontSize={'sm'}>{createdBy.username}</Text>
          <Text fontSize={'sm'}>
            {moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}
          </Text>
        </Flex>
      )}
      <Box
        background={'cyan.100'}
        paddingX={'15px'}
        paddingY={'5px'}
        minW={'300px'}
        maxW={'400px'}
        borderRadius={'10px'}
        cursor={'pointer'}
        onClick={() => onClick && onClick()}
      >
        <Text>{content}</Text>
      </Box>
    </Box>
  );
};

type MessageGroupProps = {
  messages: MessageItem[];
  showAvatar?: boolean;
};

// Message Group makes it so the avatar is only on the last message
const MessageGroup = ({ messages, showAvatar = true }: MessageGroupProps) => {
  const [showInfoFor, setShowInfoFor] = useState(null);
  const createdBy = messages[0].createdBy;
  return (
    <Flex gap={'4px'} padding={'5px'}>
      {showAvatar && (
        <Avatar
          size="md"
          name={createdBy.username}
          src={`https://avatars.dicebear.com/api/initials/${createdBy.username}.svg`}
          alignSelf={'center'}
          marginTop={'auto'}
        />
      )}
      <Flex direction={'column'} gap={'4px'}>
        {messages.map((message) => (
          <Message
            key={message.id}
            {...message}
            isInfoShown={showInfoFor === message.id}
            onClick={() => {
              if (showInfoFor === message.id) {
                setShowInfoFor(null);
              } else {
                setShowInfoFor(message.id);
              }
            }}
          />
        ))}
      </Flex>
    </Flex>
  );
};

const ChatArea = () => {
  const [
    createMessageMutation,
    {
      data: createMessageData,
      loading: loadingCreateMessage,
      error: createMessageError,
    },
  ] = useCreateMessageMutation();
  const { loading, data, error, fetchMore } = useGetChannelMessagesQuery({
    variables: {
      channelId: 1,
      last: 10,
    },
  });

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

  if (loading) {
    return <>Loading messages</>;
  }

  if (error) {
    return <>Error loading messages</>;
  }

  const messages = data.channelMessages.edges.map((x) => x.node).reverse();

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
    <Flex direction={'column'} w={'100%'} h={'100%'}>
      <Flex direction={'column'} gap={'5px'}>
        {groupedMessages.map((group, idx) => (
          <MessageGroup key={idx} messages={group} />
        ))}
      </Flex>
      <Box marginTop={'auto'}>
        <form onSubmit={formik.handleSubmit}>
          <Flex>
            <FormControl
              isInvalid={formik.errors.content && formik.touched.content}
            >
              <Input
                id="content"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.content}
              />
            </FormControl>
            <Button type="submit" isLoading={loadingCreateMessage}>
              Send
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

const createMessageSchema = Yup.object().shape({
  content: Yup.string()
    .min(1, 'Content Required!')
    .required('Name is required'),
});

type Props = {};

const Chat = (props: Props) => {
  const [createChannelIsOpen, setCreateChannelIsOpen] = useState(false);

  return (
    <Grid gridTemplateColumns={'auto 1fr'} boxSize={'100%'}>
      <Sidebar onCreateChannel={() => setCreateChannelIsOpen(true)} />
      <Box w={'100%'}>
        <ChatArea />
      </Box>
      {createChannelIsOpen && (
        <CreateChannelModal
          isOpen={createChannelIsOpen}
          onClose={(channelId) => {
            if (channelId != null) {
              // Do something
            }
            setCreateChannelIsOpen(false);
          }}
        />
      )}
    </Grid>
  );
};

export default Chat;
