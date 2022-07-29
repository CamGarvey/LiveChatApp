import { createContext, useContext } from 'react';
import { GetChatsQuery } from '../graphql/generated/graphql';

export const ChatContext = createContext<{
  isLoading: boolean;
  chat: GetChatsQuery['chats'][0];
}>({ isLoading: false, chat: null });

export const useChat = () => useContext(ChatContext);
