import {
  GetNotificationsQuery,
  NotificationsDocument,
  NotificationsSubscription,
  RequestStatus,
  useGetNotificationsQuery,
} from 'graphql/generated/graphql';
import { useEffect } from 'react';

interface Notification {
  status: RequestStatus;
  isCreator: boolean;
}

/**
 * doing this because a friend request can go back and forth between two users
 * and changing between who created the request since the cache doesn't care about who created it
 *  since there should be only a single friend request between two users
 * @param notifications
 * @returns
 */
const filterNotifications = <T extends Notification>(notifications: T[]): T[] =>
  notifications
    .filter((x) => ['SENT', 'SEEN'].includes(x.status))
    .filter((x) => !x.isCreator) ?? [];

/**
 * Live notification query - will listen to any incoming notifications
 * @returns
 */
export const useLiveNotifications = () => {
  const { data, subscribeToMore, loading } = useGetNotificationsQuery();

  useEffect(() => {
    const unsubscribe = subscribeToMore<NotificationsSubscription>({
      document: NotificationsDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const notification = subscriptionData.data;
        const newCache = Object.assign({}, prev, {
          notifications: [...prev.notifications, notification],
        } as GetNotificationsQuery);
        return newCache;
      },
    });
    return () => unsubscribe();
  }, [subscribeToMore]);

  const filteredNotifications = filterNotifications(data?.notifications ?? []);

  return {
    notifications: filteredNotifications,
    loading,
  };
};
