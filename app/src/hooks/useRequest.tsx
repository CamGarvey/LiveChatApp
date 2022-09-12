import { gql } from '@apollo/client';
import {
  FriendRequestUserFragment,
  FriendRequestUserFragmentDoc,
  StrangerStatus,
  useAcceptFriendRequestMutation,
  useCancelFriendRequestMutation,
  useDeclineFriendRequestMutation,
  useDeleteFriendMutation,
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
  mutation SendFriendRequest($friendId: HashId!) {
    sendFriendRequest(friendId: $friendId) {
      ...RequestInfo
    }
  }
  mutation DeleteFriend($friendId: HashId!) {
    deleteFriend(friendId: $friendId) {
      id
      status
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
    useAcceptFriendRequestMutation();
  const [decline, { data: delcineData, loading: loadingDecline }] =
    useDeclineFriendRequestMutation();
  const [cancel, { data: cancelData, loading: loadingCancel }] =
    useCancelFriendRequestMutation();
  const [send, { data: sendData, loading: loadingSend }] =
    useSendFriendRequestMutation();

  const [remove, { data: deleteData, loading: loadingDelete }] =
    useDeleteFriendMutation();

  const acceptRequest = (requestId: string) =>
    accept({
      variables: {
        requestId,
      },
      update: (cache, { data: newData }) => {
        cache.updateFragment<FriendRequestUserFragment>(
          {
            id: `User:${newData.acceptFriendRequest.createdById}`,
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

  const deleteFriend = (friendId: string) =>
    remove({
      variables: {
        friendId,
      },
      update: (cache) => {
        cache.updateFragment<FriendRequestUserFragment>(
          {
            id: `User:${friendId}`,
            fragment: FriendRequestUserFragmentDoc,
          },
          (data) => ({
            ...data,
            __typename: 'Stranger',
            // Attach new friend request
            friendRequest: null,
            // Update status
            status: StrangerStatus.NoRequest,
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
    deleteFriend,
    deleteData,
    loadingDelete,
  };
};
