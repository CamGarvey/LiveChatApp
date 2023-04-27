import { gql } from '@apollo/client';
import NotificationMenu from 'components/Layout/ChatHeader/NotificationMenu';
import { useLiveRequests } from './useLiveRequests';

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
  const { requests, loading } = useLiveRequests();

  return {
    requests,
    loading,
  };
};
