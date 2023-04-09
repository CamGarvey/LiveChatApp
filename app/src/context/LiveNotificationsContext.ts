import { LiveNotificationFragment } from 'graphql/generated/graphql';
import { createContext, useContext } from 'react';

export const LiveNotificationsContext = createContext<{
  loading: boolean;
  requests: LiveNotificationFragment[];
}>({ loading: false, requests: [] });

export const useLiveNotifications = () => useContext(LiveNotificationsContext);
