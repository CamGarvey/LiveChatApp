import { useLiveRequests } from './useLiveRequests';

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
