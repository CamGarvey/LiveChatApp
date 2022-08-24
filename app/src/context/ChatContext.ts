import { createContext, useContext } from 'react';

export const ChatContext = createContext<{
  chatId: string;
}>({ chatId: null });

export const useChat = () => useContext(ChatContext);
