import { gql } from '@apollo/client';
import NotificationMenu from 'components/Layout/ChatHeader/NotificationMenu';
import {
  GetNotificationsQuery,
  NotificationsDocument,
  NotificationsSubscription,
  useGetNotificationsQuery,
} from 'graphql/generated/graphql';
import { useEffect } from 'react';

gql`
  query GetRequests {
    requests {
      ...LiveRequest
    }
  }
  subscription Requests {
    requests {
      ...LiveRequest
    }
  }
  fragment LiveRequest on Request {
    ...NotificationMenuRequest
  }
  ${NotificationMenu.fragments.request}
`;

/**
 * Live notification query - will listen to any incoming notifications
 * @returns
 */
export const useLiveNotifications = () => {
  const { data, subscribeToMore, loading } = useGe();

  useEffect(() => {
    const unsubscribe = subscribeToMore<NotificationsSubscription>({
      document: NotificationsDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const notification = subscriptionData.data.notifications;

        if (!notification) {
          throw new Error('No notification found');
        }

        const newCache = Object.assign({}, prev ?? {}, {
          notifications: [
            ...(prev?.notifications?.filter((x) => x.id !== notification.id) ??
              []),
            notification,
          ],
        } as GetNotificationsQuery);

        return newCache;
      },
    });
    return () => unsubscribe();
  }, [subscribeToMore]);

  return {
    requests:
      data?.requests
        .slice()
        .filter((x) => {
          if (x.__typename === 'FriendRequest') {
            return x.state === 'SENT';
          }
          return true;
        })
        .sort((a, b) => b.createdAt - a.createdAt) ?? [],
    loading,
  };
};
