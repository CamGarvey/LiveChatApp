import { gql } from '@apollo/client';
import {
  FriendRequestStrangerFragment,
  FriendRequestStrangerFragmentDoc,
  useSendFriendRequestMutation,
  UseStrangerFragment,
} from 'graphql/generated/graphql';
import { useMemo } from 'react';

gql`
  mutation SendFriendRequest($userId: HashId!) {
    sendFriendRequest(userId: $userId) {
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

  const [sendRequestMutation, { data: sendRequestData, loading }] =
    useSendFriendRequestMutation();

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
    sendFriendRequest,
    sendRequestData,
    loading,
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
