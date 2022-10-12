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
  query GetNotifications {
    notifications {
      ...LiveNotification
    }
  }
  subscription Notifications {
    notifications {
      ...LiveNotification
    }
  }
  fragment LiveNotification on Notification {
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
    ... on RequestResponseAlert {
      request {
        id
        state
      }
    }
    ... on Request {
      createdById
      isCreator
      state
      createdBy {
        ... on Stranger {
          friendRequest {
            id
          }
        }
      }
      recipient {
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
  notifications.filter(
    (x) =>
      !x.isCreator &&
      x.__typename === 'FriendRequest' &&
      ['SEEN', 'SENT'].includes(x.state)
  ) ?? [];

type Props = {
  onNotification: (notification: LiveNotificationFragment) => void;
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

        if (!notification) {
          throw new Error('No notification found');
        }

        onNotification(notification);
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
