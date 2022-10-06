import { useContext, createContext } from 'react';

export const UserContext = createContext<{
  loading: boolean;
  user:
    | {
        id: any;
        username: string;
        name?: string | null | undefined;
      }
    | undefined
    | null;
}>({ user: null, loading: false });

export const useUser = () => useContext(UserContext);
