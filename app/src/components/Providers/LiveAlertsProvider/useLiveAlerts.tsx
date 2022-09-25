import { gql } from '@apollo/client';
import {
  GetNotificationsQuery,
  LiveNotificationFragment,
  NotificationsDocument,
  NotificationsSubscription,
  useGetNotificationsQuery,
} from 'graphql/generated/graphql';
import { useEffect } from 'react';

gql`
  query GetAlerts {
    alerts {
      ...LiveNotification
    }
  }
  subscription Alerts {
    alerts {
      ...LiveNotification
    }
  }
  fragment LiveAlerts on Alert {
    id
    createdAt
    isCreator
    createdBy {
      id
      name
      username
      ... on Stranger {
        status
      }
    }
    ... on Request {
      createdById
      isCreator
      createdBy {
        ... on Stranger {
          friendRequest {
            id
          }
        }
      }
      recipients {
        id
        ... on Stranger {
          status
        }
      }
    }
  }
`;

/**
 * doing this because a friend request can go back and forth between two users
 * and changing between who created the request since the cache doesn't care about who created it
 *  since there should be only a single friend request between two users
 * @param notifications
 * @returns
 */
const filterNotifications = (
  notifications: LiveNotificationFragment[]
): LiveNotificationFragment[] =>
  notifications.filter((x) => !x.isCreator) ?? [];

type Props = {
  onNotification: (notification: NotificationsSubscription) => void;
};

/**
 * Live notification query - will listen to any incoming notifications
 * @returns
 */
export const useLiveNotifications = ({ onNotification }: Props) => {
  const { data, subscribeToMore, loading } = useGetNotificationsQuery();

  useEffect(() => {
    const unsubscribe = subscribeToMore<NotificationsSubscription>({
      document: NotificationsDocument,

      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const notification = subscriptionData.data.notifications;
        onNotification(subscriptionData.data);
        const newCache = Object.assign({}, prev, {
          notifications: [
            ...prev.notifications.filter((x) => x.id !== notification.id),
            notification,
          ],
        } as GetNotificationsQuery);
        return newCache;
      },
    });
    return () => unsubscribe();
  }, [subscribeToMore, onNotification]);

  const filteredNotifications = filterNotifications(data?.notifications ?? []);

  return {
    notifications: filteredNotifications,
    loading,
  };
};
