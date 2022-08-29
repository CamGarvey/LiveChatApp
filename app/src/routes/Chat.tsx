import ChatPanel from 'components/Chat/ChatPanel/ChatPanel';
import { useParams } from 'react-router-dom';
import { useChatId } from 'store';

const Chat = () => {
  const { chatId } = useParams();
  const { setChatId } = useChatId();
  setChatId(chatId);
  return <ChatPanel chatId={chatId} />;
};

export default Chat;
