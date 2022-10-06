import { gql } from '@apollo/client';
import {
  FriendRequestStrangerFragment,
  FriendRequestStrangerFragmentDoc,
  useAcceptRequestMutation,
  useCancelRequestMutation,
  useDeclineRequestMutation,
  useSendFriendRequestMutation,
} from 'graphql/generated/graphql';

gql`
  mutation AcceptRequest($requestId: HashId!) {
    acceptRequest(requestId: $requestId) {
      ...RequestInfo
    }
  }
  mutation DeclineRequest($requestId: HashId!) {
    declineRequest(requestId: $requestId) {
      ...RequestInfo
    }
  }
  mutation CancelRequest($requestId: HashId!) {
    cancelRequest(requestId: $requestId) {
      ...RequestInfo
    }
  }
  mutation SendFriendRequest($strangerId: HashId!) {
    sendFriendRequest(strangerId: $strangerId) {
      ...RequestInfo
    }
  }
  fragment RequestInfo on FriendRequest {
    id
    isCreator
    createdById
    recipientId
    state
  }
  fragment FriendRequestStranger on Stranger {
    id
    friendRequest {
      id
    }
  }
`;

export const useRequest = () => {
  const [accept, { data: acceptData, loading: loadingAccept }] =
    useAcceptRequestMutation();
  const [decline, { data: delcineData, loading: loadingDecline }] =
    useDeclineRequestMutation();
  const [cancel, { data: cancelData, loading: loadingCancel }] =
    useCancelRequestMutation();
  const [send, { data: sendData, loading: loadingSend }] =
    useSendFriendRequestMutation();

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

  const sendRequest = (strangerId: string) =>
    send({
      variables: {
        strangerId,
      },
      update: (cache, { data: newData }) => {
        cache.updateFragment<FriendRequestStrangerFragment>(
          {
            id: `User:${strangerId}`,
            fragment: FriendRequestStrangerFragmentDoc,
          },
          (data) => {
            if (!data) {
              throw new Error('No data poopy');
            }
            return {
              ...data,
              // Attach new friend request
              friendRequest: newData?.sendFriendRequest,
            };
          }
        );
      },
    });

  return {
    acceptRequest,
    acceptData,
    declineRequest,
    delcineData,
    cancelRequest,
    cancelData,
    sendRequest,
    sendData,
    loading: loadingAccept || loadingCancel || loadingDecline || loadingSend,
  };
};
