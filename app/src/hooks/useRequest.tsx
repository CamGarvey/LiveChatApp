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
  const [accept, { loading: loadingAccept }] = useAcceptRequestMutation();
  const [decline, { loading: loadingDecline }] = useDeclineRequestMutation();
  const [cancel, { loading: loadingCancel }] = useCancelRequestMutation();

  const acceptRequest = useCallback(
    (requestId: string) =>
      accept({
        variables: {
          requestId,
        },
      }),
    [accept]
  );

  const declineRequest = useCallback(
    (requestId: string) =>
      decline({
        variables: {
          requestId,
        },
      }),
    [decline]
  );

  const cancelRequest = useCallback(
    (requestId: string) =>
      cancel({
        variables: {
          requestId,
        },
      }),
    [cancel]
  );

  return {
    declineRequest,
    acceptRequest,
    cancelRequest,
    loading: loadingDecline || loadingAccept || loadingCancel,
  };
};
