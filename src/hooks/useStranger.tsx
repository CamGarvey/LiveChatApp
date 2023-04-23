import { gql } from '@apollo/client';
import { UseStrangerFragment } from 'graphql/generated/graphql';
import { useMemo } from 'react';

type StrangerStatus = 'NO_FRIEND_REQUEST' | 'SENT_FRIEND_REQUEST' | 'RECEIVED_FRIEND_REQUEST';

export const useStranger = (stranger: UseStrangerFragment) => {
  const status = useMemo<StrangerStatus>(() => {
    if (stranger.friendRequest) {
      if (['SENT', 'SEEN'].includes(stranger.friendRequest.state)) {
        return stranger.friendRequest.isCreator ? 'SENT_FRIEND_REQUEST' : 'RECEIVED_FRIEND_REQUEST';
      }
    }
    return 'NO_FRIEND_REQUEST';
  }, [stranger]);

  return {
    status,
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
