import { LiveNotificationsContext } from 'context/LiveNotificationsContext';
import { useLiveNotifications } from './useLiveAlerts';

type Props = {
  children: React.ReactNode;
};

const LiveNotificationsProvider = ({ children }: Props) => {
  const { notifications, loading } = useLiveNotifications({
    onNotification: () => {},
  });

  return (
    <LiveNotificationsContext.Provider
      value={{
        notifications,
        loading,
      }}
    >
      {children}
    </LiveNotificationsContext.Provider>
  );
};

export default LiveNotificationsProvider;
