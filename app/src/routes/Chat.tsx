import { Center } from '@mantine/core';
import ChatPanel from 'components/ChatPanel/ChatPanel';
import { useParams } from 'react-router-dom';

const Chat = () => {
  const { chatId } = useParams();
  if (chatId === undefined) {
    return <Center>No chat id</Center>;
  }
  return <ChatPanel chatId={chatId} />;
};

export default Chat;
