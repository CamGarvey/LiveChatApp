import ChatPanel from 'components/Chat/ChatPanel/ChatPanel';
import { ChatContext } from 'context/ChatContext';
import { useParams } from 'react-router-dom';

const Chat = () => {
  const { chatId } = useParams();
  return (
    <ChatContext.Provider value={{ chatId }}>
      <ChatPanel chatId={chatId} />
    </ChatContext.Provider>
  );
};

export default Chat;
