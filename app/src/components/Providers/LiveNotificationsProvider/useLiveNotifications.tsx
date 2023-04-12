import { gql } from '@apollo/client';
import NotificationMenu from 'components/Layout/ChatHeader/NotificationMenu';
import {
  GetRequestsQuery,
  RequestsDocument,
  RequestsSubscription,
  useGetRequestsQuery,
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
    state
    createdAt
  }
  ${NotificationMenu.fragments.request}
`;

/**
 * Live notification query - will listen to any incoming notifications
 * @returns
 */
export const useLiveNotifications = () => {
  const { data, subscribeToMore, loading } = useGetRequestsQuery();

  useEffect(() => {
    const unsubscribe = subscribeToMore<RequestsSubscription>({
      document: RequestsDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const request = subscriptionData.data.requests;

        if (!request) {
          throw new Error('No request found');
        }

        const newCache = Object.assign({}, prev ?? {}, {
          requests: [
            ...(prev?.requests?.filter((x) => x.id !== request.id) ?? []),
            request,
          ],
        } as GetRequestsQuery);

        return newCache;
      },
    });
    return () => unsubscribe();
  }, [subscribeToMore]);

  return {
    requests:
      data?.requests
        .slice()
        .filter((x) => x.state === 'SENT')
        .sort((a, b) => b.createdAt - a.createdAt) ?? [],
    loading,
  };
};
