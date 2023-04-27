import { gql } from '@apollo/client';
import {
  useAcceptRequestMutation,
  useCancelRequestMutation,
  useDeclineRequestMutation,
  useDeleteRequestMutation,
} from 'graphql/generated/graphql';
import { useCallback } from 'react';

gql`
  mutation AcceptRequest($requestId: HashId!) {
    acceptRequest(requestId: $requestId) {
      ...UseRequest
      createdBy {
        id
      }
    }
  }
  mutation DeclineRequest($requestId: HashId!) {
    declineRequest(requestId: $requestId) {
      ...UseRequest
    }
  }
  mutation CancelRequest($requestId: HashId!) {
    cancelRequest(requestId: $requestId) {
      ...UseRequest
    }
  }
  mutation DeleteRequest($requestId: HashId!) {
    deleteRequest(requestId: $requestId) {
      ...UseRequest
    }
  }

  fragment UseRequest on Request {
    id
    isCreator
    createdById
    recipientId
    state
  }
`;

export const useRequest = () => {
  const [acceptRequest, { loading: loadingAccept }] = useAcceptRequestMutation();
  const [declineRequest, { loading: loadingDecline }] = useDeclineRequestMutation();
  const [cancelRequest, { loading: loadingCancel }] = useCancelRequestMutation();
  const [deleteRequest, { loading: loadingDelete }] = useDeleteRequestMutation();

  const accept = useCallback(
    (requestId: string) =>
      acceptRequest({
        variables: {
          requestId,
        },
        update: (cache, { data }) => {
          if (data) {
            // Remove request from cache
            cache.evict({
              id: cache.identify(data.acceptRequest),
            });
            cache.gc();
          }
        },
      }),
    [acceptRequest]
  );

  const decline = useCallback(
    (requestId: string) =>
      declineRequest({
        variables: {
          requestId,
        },
        update: (cache, { data }) => {
          if (data) {
            // Remove request from cache
            cache.evict({
              id: cache.identify(data.declineRequest),
            });
            cache.gc();
          }
        },
      }),
    [declineRequest]
  );

  const cancel = useCallback(
    (requestId: string) =>
      cancelRequest({
        variables: {
          requestId,
        },
        update: (cache, { data }) => {
          if (data) {
            // Remove request from cache
            cache.evict({
              id: cache.identify(data.cancelRequest),
            });
            cache.gc();
          }
        },
      }),
    [cancelRequest]
  );

  const del = useCallback(
    (requestId: string) =>
      deleteRequest({
        variables: {
          requestId,
        },
        update: (cache, { data }) => {
          if (data) {
            // Remove request from cache
            cache.evict({
              id: cache.identify(data.deleteRequest),
            });
            cache.gc();
          }
        },
      }),
    [deleteRequest]
  );

  return {
    accept,
    decline,
    cancel,
    del,
    loading: loadingDecline || loadingAccept || loadingCancel || loadingDelete,
  };
};
