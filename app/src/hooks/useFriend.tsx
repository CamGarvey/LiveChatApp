import { gql } from '@apollo/client';
import {
  useDeleteFriendMutation,
  UseFriendFragment,
} from 'graphql/generated/graphql';

gql`
  mutation DeleteFriend($userId: HashId!) {
    deleteFriend(userId: $userId) {
      id
    }
  }
  fragment FriendRequestStranger on Stranger {
    id
    friendRequest {
      id
    }
  }
`;

export const useFriend = (friend: UseFriendFragment) => {
  const [
    deleteFriendMutation,
    { data: deleteFriendData, loading: loadingDeleteFriend },
  ] = useDeleteFriendMutation();

  const deleteFriend = () =>
    deleteFriendMutation({
      variables: {
        userId: friend.id,
      },
    });

  return {
    deleteFriend,
    deleteFriendData,
    loading: loadingDeleteFriend,
  };
};

useFriend.fragments = {
  user: gql`
    fragment UseFriend on Friend {
      id
    }
  `,
};
