import { gql } from '@apollo/client';
import {
  FriendRequestStrangerFragment,
  FriendRequestStrangerFragmentDoc,
  useAcceptFriendRequestMutation,
  useCancelFriendRequestMutation,
  useDeclineFriendRequestMutation,
  useSendFriendRequestMutation,
  UseStrangerFragment,
} from 'graphql/generated/graphql';
import { useMemo, useReducer } from 'react';

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

const todosReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        {
          text: action.text,
          completed: false,
        },
      ];
    // ... other actions ...
    default:
      return state;
  }
};

type StrangerStatus =
  | 'NO_FRIEND_REQUEST'
  | 'SENT_FRIEND_REQUEST'
  | 'RECEIVED_FRIEND_REQUEST';

export const useStranger = (stranger: UseStrangerFragment) => {
  const status = useMemo<StrangerStatus>(() => {
    if (stranger.friendRequest) {
      if (['SENT', 'SEEN'].includes(stranger.friendRequest.state)) {
        return stranger.friendRequest.isCreator
          ? 'SENT_FRIEND_REQUEST'
          : 'RECEIVED_FRIEND_REQUEST';
      }
    }
    return 'NO_FRIEND_REQUEST';
  }, [stranger]);

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

  const acceptFriendRequest = () => {
    if (!stranger.friendRequest?.id) throw new Error('No friend request');
    acceptRequestMutation({
      variables: {
        requestId: stranger.friendRequest.id,
      },
    });
  };
  const declineFriendRequest = () => {
    if (!stranger.friendRequest?.id) throw new Error('No friend request');
    declineRequestMutation({
      variables: {
        requestId: stranger.friendRequest.id,
      },
    });
  };
  const cancelFriendRequest = () => {
    if (!stranger.friendRequest?.id) throw new Error('No friend request');
    cancelRequestMutation({
      variables: {
        requestId: stranger.friendRequest.id,
      },
    });
  };

  const sendFriendRequest = () =>
    sendRequestMutation({
      variables: {
        strangerId: stranger.id,
      },
      update: (cache, { data: newData }) => {
        cache.updateFragment<FriendRequestStrangerFragment>(
          {
            id: `User:${stranger.id}`,
            fragment: FriendRequestStrangerFragmentDoc,
          },
          (data) => {
            if (!data) {
              throw new Error('sendFriendRequest No data');
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
    status,
    acceptFriendRequest,
    acceptRequestData,
    declineFriendRequest,
    delcineRequestData,
    cancelFriendRequest,
    cancelRequestData,
    sendFriendRequest,
    sendRequestData,
    loading: loadingAccept || loadingCancel || loadingDecline || loadingSend,
  };
};

useStranger.fragments = {
  user: gql`
    fragment UseStranger on Stranger {
      id
      friendRequest {
        id
        isCreator
        createdById
        recipientId
        state
      }
    }
  `,
};
