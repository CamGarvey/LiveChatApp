import { gql } from '@apollo/client';
import {
  FriendRequestStrangerFragment,
  FriendRequestStrangerFragmentDoc,
  useAcceptFriendRequestMutation,
  useCancelFriendRequestMutation,
  useDeclineFriendRequestMutation,
  useDeleteFriendMutation,
  useSendFriendRequestMutation,
} from 'graphql/generated/graphql';

gql`
  mutation AcceptFriendRequest($requestId: HashId!) {
    acceptRequest(requestId: $requestId) {
      ...RequestInfo
    }
  }
  mutation DeclineFriendRequest($requestId: HashId!) {
    declineRequest(requestId: $requestId) {
      ...RequestInfo
    }
  }
  mutation CancelFriendRequest($requestId: HashId!) {
    cancelRequest(requestId: $requestId) {
      ...RequestInfo
    }
  }
  mutation SendFriendRequest($strangerId: HashId!) {
    sendFriendRequest(strangerId: $strangerId) {
      ...RequestInfo
    }
  }
  mutation DeleteFriend($friendId: HashId!) {
    deleteFriend(friendId: $friendId) {
      id
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
    status
    friendRequest {
      id
    }
  }
`;

export const useFriendship = () => {
  const [
    acceptRequestMutation,
    { data: acceptRequestData, loading: loadingAccept },
  ] = useAcceptFriendRequestMutation();
  const [
    declineRequestMutation,
    { data: delcineRequestData, loading: loadingDecline },
  ] = useDeclineFriendRequestMutation();
  const [
    cancelRequestMutation,
    { data: cancelRequestData, loading: loadingCancel },
  ] = useCancelFriendRequestMutation();
  const [sendRequestMutation, { data: sendRequestData, loading: loadingSend }] =
    useSendFriendRequestMutation();
  const [
    deleteFriendMutation,
    { data: deleteFriendData, loading: loadingDeleteFriend },
  ] = useDeleteFriendMutation();

  const acceptFriendRequest = (requestId: string) =>
    acceptRequestMutation({
      variables: {
        requestId,
      },
    });

  const declineFriendRequest = (requestId: string) =>
    declineRequestMutation({
      variables: {
        requestId,
      },
    });

  const cancelFriendRequest = (requestId: string) =>
    cancelRequestMutation({
      variables: {
        requestId,
      },
    });

  const sendFriendRequest = (strangerId: string) =>
    sendRequestMutation({
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

  const deleteFriend = (friendId: string) =>
    deleteFriendMutation({
      variables: {
        friendId,
      },
    });

  return {
    acceptFriendRequest,
    acceptRequestData,
    declineFriendRequest,
    delcineRequestData,
    cancelFriendRequest,
    cancelRequestData,
    sendFriendRequest,
    sendRequestData,
    deleteFriend,
    deleteFriendData,
    loading:
      loadingAccept ||
      loadingCancel ||
      loadingDecline ||
      loadingSend ||
      loadingDeleteFriend,
  };
};
