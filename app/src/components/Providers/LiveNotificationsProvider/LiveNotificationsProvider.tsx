import { LiveNotificationsContext } from 'context/LiveNotificationsContext';
import { useLiveNotifications } from './useLiveNotifications';

type Props = {
  children: React.ReactNode;
};

const LiveNotificationsProvider = ({ children }: Props) => {
  const { notifications, loading } = useLiveNotifications({
    onNotification: (noti) => {
      console.log(noti);
    },
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
