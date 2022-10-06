import { LiveNotificationFragment } from 'graphql/generated/graphql';
import { createContext, useContext } from 'react';

export const LiveNotificationsContext = createContext<{
  loading: boolean;
  notifications: LiveNotificationFragment[];
}>({ loading: false, notifications: [] });

export const useLiveNotifications = () => useContext(LiveNotificationsContext);
