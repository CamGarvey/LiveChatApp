import { useContext, createContext } from 'react';
import { FriendStatus } from '../graphql/generated/graphql';

export const UserContext = createContext<{
  isLoading: boolean;
  user: {
    id: string;
    username: string;
    name?: string;
    receivedFriendRequests: {
      id: string;
      username: string;
      name?: string;
      friendStatus: FriendStatus;
    }[];
  };
}>({ user: null, isLoading: false });

export const useUser = () => useContext(UserContext);
