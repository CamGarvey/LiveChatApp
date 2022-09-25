import { gql } from '@apollo/client';
import {
  FriendRequestUserFragment,
  FriendRequestUserFragmentDoc,
  useAcceptRequestMutation,
  useCancelRequestMutation,
  useDeclineRequestMutation,
  useSendFriendRequestMutation,
} from 'graphql/generated/graphql';

gql`
  mutation AcceptRequest($requestId: HashId!) {
    acceptRequest(requestId: $requestId) {
      id
      createdById
    }
  }
  mutation DeclineRequest($requestId: HashId!) {
    declineRequest(requestId: $requestId) {
      id
      createdById
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
  }
  fragment FriendRequestUser on User {
    id
    ... on Stranger {
      status
      friendRequest {
        id
      }
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
      update: (cache, { data: newData }) => {
        cache.updateFragment<FriendRequestUserFragment>(
          {
            id: `User:${newData.acceptRequest.createdById}`,
            fragment: FriendRequestUserFragmentDoc,
          },
          (data) => ({
            ...data,
            // Update typename
            __typename: 'Friend',
            // Remove friend request
            friendRequest: null,
          })
        );
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

  const sendRequest = (friendId: string) =>
    send({
      variables: {
        friendId,
      },
      update: (cache, { data: newData }) => {
        cache.updateFragment<FriendRequestUserFragment>(
          {
            id: `User:${friendId}`,
            fragment: FriendRequestUserFragmentDoc,
          },
          (data) => ({
            ...data,
            // Attach new friend request
            friendRequest: newData.sendFriendRequest,
            // Update status
            status: StrangerStatus.RequestSent,
          })
        );
      },
    });

  return {
    acceptRequest,
    loadingAccept,
    acceptData,
    declineRequest,
    loadingDecline,
    delcineData,
    cancelRequest,
    cancelData,
    loadingCancel,
    sendRequest,
    sendData,
    loadingSend,
  };
};
