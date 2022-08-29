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
  mutation AcceptFriendRequest($friendRequestId: HashId!) {
    acceptFriendRequest(friendRequestId: $friendRequestId) {
      ...RequestInfo
    }
  }
  mutation DeclineFriendRequest($friendRequestId: HashId!) {
    declineFriendRequest(friendRequestId: $friendRequestId) {
      ...RequestInfo
    }
  }
  mutation CancelFriendRequest($friendRequestId: HashId!) {
    cancelFriendRequest(friendRequestId: $friendRequestId) {
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
    status
    createdById
    recipientId
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

export const useFriendRequest = () => {
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

  const acceptRequest = (friendRequestId: string) =>
    accept({
      variables: {
        friendRequestId,
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

  const declineRequest = (friendRequestId: string) =>
    decline({
      variables: {
        friendRequestId,
      },
      update: (cache, { data: newData }) => {
        cache.updateFragment<FriendRequestUserFragment>(
          {
            id: `User:${newData.declineFriendRequest.createdById}`,
            fragment: FriendRequestUserFragmentDoc,
          },
          (data) => ({
            ...data,
            // Remove friend request
            friendRequest: null,
            // Update status
            status: StrangerStatus.NoRequest,
          })
        );
      },
    });

  const cancelRequest = (friendRequestId: string) =>
    cancel({
      variables: {
        friendRequestId,
      },
      update: (cache, { data: newData }) => {
        cache.updateFragment<FriendRequestUserFragment>(
          {
            id: `User:${newData.cancelFriendRequest.recipientId}`,
            fragment: FriendRequestUserFragmentDoc,
          },
          (data) => ({
            ...data,
            // Remove friend request
            friendRequest: null,
            // Update status
            status: StrangerStatus.NoRequest,
          })
        );
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
