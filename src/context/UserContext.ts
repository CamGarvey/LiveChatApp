import { useContext, createContext } from 'react';

export const UserContext = createContext<{
  loading: boolean;
  user:
    | {
        id: any;
        username: string;
        name?: string | null | undefined;
      }
    | undefined;
}>({ user: undefined, loading: false });

export const useUser = () => useContext(UserContext);
