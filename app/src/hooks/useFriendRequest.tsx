import { gql } from '@apollo/client';
import {
  useAcceptFriendRequestMutation,
  useCancelFriendRequestMutation,
  useDeclineFriendRequestMutation,
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
  fragment RequestInfo on FriendRequest {
    id
    isCreator
    status
    createdById
    recipientId
    createdBy {
      id
    }
    recipient {
      id
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

  const acceptRequest = (friendRequestId: string) =>
    accept({
      variables: {
        friendRequestId,
      },
    });

  const declineRequest = (friendRequestId: string) =>
    decline({
      variables: {
        friendRequestId,
      },
    });

  const cancelRequest = (friendRequestId: string) =>
    cancel({
      variables: {
        friendRequestId,
      },
    });

  const sendRequest = (friendId: string) =>
    send({
      variables: {
        friendId,
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
