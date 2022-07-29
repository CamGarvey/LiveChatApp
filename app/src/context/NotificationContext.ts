import { createContext, useContext } from 'react';
import { GetNotificationsQuery } from '../graphql/generated/graphql';

export const NotificationContext = createContext<{
  isLoading: boolean;
  notifications: GetNotificationsQuery['notifications'];
}>({ isLoading: false, notifications: null });

export const useUserNotifications = () => useContext(NotificationContext);
