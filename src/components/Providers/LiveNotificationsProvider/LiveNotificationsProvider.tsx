import { LiveNotificationsContext } from 'context/LiveNotificationsContext';
import { useLiveNotifications } from './useLiveNotifications';
import { useMemo } from 'react';

type Props = {
  children: React.ReactNode;
};

const LiveNotificationsProvider = ({ children }: Props) => {
  const { requests, loading } = useLiveNotifications();

  const value = useMemo(
    () => ({
      requests,
      loading,
    }),
    [requests, loading]
  );

  return (
    <LiveNotificationsContext.Provider value={value}>{children}</LiveNotificationsContext.Provider>
  );
};

export default LiveNotificationsProvider;
