import { gql } from '@apollo/client';
import {
  useAcceptRequestMutation,
  useCancelRequestMutation,
  useDeclineRequestMutation,
} from 'graphql/generated/graphql';

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

const useRequest = () => {
  const [accept, { loading: loadingAccept }] = useAcceptRequestMutation();
  const [decline, { loading: loadingDecline }] = useDeclineRequestMutation();
  const [cancel, { loading: loadingCancel }] = useCancelRequestMutation();

  const acceptRequest = (requestId: string) =>
    accept({
      variables: {
        requestId,
      },
    });

  const declineRequest = (requestId: string) =>
    decline({
      variables: {
        requestId,
      },
    });

  const cancelRequest = (requestId: string) =>
    cancel({
      variables: {
        requestId,
      },
    });

  return {
    declineRequest,
    acceptRequest,
    cancelRequest,
    loading: loadingDecline || loadingAccept || loadingCancel,
  };
};

export default useRequest;
