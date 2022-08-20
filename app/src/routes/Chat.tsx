import ChatPanel from 'components/Chat/ChatPanel/ChatPanel';
import { useParams } from 'react-router-dom';

const Chat = () => {
  const { chatId } = useParams();
  return <ChatPanel chatId={chatId} />;
};

export default Chat;
