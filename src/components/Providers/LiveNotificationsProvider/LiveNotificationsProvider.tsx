import { LiveNotificationsContext } from 'context/LiveNotificationsContext';
import { useLiveNotifications } from './useLiveNotifications';

type Props = {
  children: React.ReactNode;
};

const LiveNotificationsProvider = ({ children }: Props) => {
  const { requests, loading } = useLiveNotifications();

  return (
    <LiveNotificationsContext.Provider
      value={{
        requests,
        loading,
      }}
    >
      {children}
    </LiveNotificationsContext.Provider>
  );
};

export default LiveNotificationsProvider;
