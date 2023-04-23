import { gql } from '@apollo/client';
import {
  useAcceptRequestMutation,
  useCancelRequestMutation,
  useDeclineRequestMutation,
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

  const accept = useCallback(
    (requestId: string) =>
      acceptRequest({
        variables: {
          requestId,
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
      }),
    [declineRequest]
  );

  const cancel = useCallback(
    (requestId: string) =>
      cancelRequest({
        variables: {
          requestId,
        },
      }),
    [cancelRequest]
  );

  return {
    accept,
    decline,
    cancel,
    loading: loadingDecline || loadingAccept || loadingCancel,
  };
};
