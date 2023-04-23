import { gql } from '@apollo/client';
import {
  FriendRequestStrangerFragment,
  FriendRequestStrangerFragmentDoc,
  useSendFriendRequestMutation,
} from 'graphql/generated/graphql';
import { useCallback } from 'react';
import { useRequest } from './useRequest';

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

export const useFriendRequest = () => {
  const { accept, decline, cancel, loading } = useRequest();
  const [sendRequest, { loading: loadingSend }] = useSendFriendRequestMutation();

  const send = useCallback(
    (userId: number) => {
      sendRequest({
        variables: {
          userId,
        },
        update: (cache, { data: newData }) => {
          cache.updateFragment<FriendRequestStrangerFragment>(
            {
              id: `User:${userId}`,
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
    },
    [sendRequest]
  );

  return {
    send,
    accept,
    decline,
    cancel,
    loading: loading || loadingSend,
  };
};
