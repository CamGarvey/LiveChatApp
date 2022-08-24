import { createContext, useContext } from 'react';

export const NotificationContext = createContext<{
  isLoading: boolean;
  notifications: any;
}>({ isLoading: false, notifications: null });

export const useUserNotifications = () => useContext(NotificationContext);
