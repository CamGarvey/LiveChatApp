import { gql } from '@apollo/client';
import NotificationMenu from 'components/Layout/Header/NotificationMenu';
import {
  GetNotificationsQuery,
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
        friendRequest {
          id
        }
      }
    }
    ... on ChatAccessAlert {
      chat {
        id
        ... on GroupChat {
          name
        }
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
          friendRequest {
            id
          }
        }
      }
    }
    ...NotificationMenuRequest
  }
  ${NotificationMenu.fragments.notification}
`;

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
    notifications:
      data?.notifications
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
