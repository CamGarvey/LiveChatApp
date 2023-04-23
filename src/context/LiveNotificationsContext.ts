import { LiveRequestFragment } from 'graphql/generated/graphql';
import { createContext, useContext } from 'react';

export const LiveNotificationsContext = createContext<{
  loading: boolean;
  requests: LiveRequestFragment[];
}>({ loading: false, requests: [] });

export const useLiveNotifications = () => useContext(LiveNotificationsContext);
