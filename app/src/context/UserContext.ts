import { useContext, createContext } from 'react';

export const UserContext = createContext<{
  isLoading: boolean;
  user: {
    id: string;
    username: string;
    name?: string;
  };
}>({ user: null, isLoading: false });

export const useUser = () => useContext(UserContext);
