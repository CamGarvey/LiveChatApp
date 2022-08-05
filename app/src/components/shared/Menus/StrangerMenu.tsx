import { ActionIcon, Menu } from '@mantine/core';
import { UserPlus } from 'tabler-icons-react';
import { useUser } from '../../../context/UserContext';
import {
  RequestStatus,
  StrangerInfoFragmentDoc,
  useSendFriendRequestMutation,
} from '../../../graphql/generated/graphql';

type Props = {
  stranger: {
    id: string;
  };
};

const StrangerMenu = ({ stranger }: Props) => {
  const { user } = useUser();
  const [sendFriendRequest] = useSendFriendRequestMutation({
    optimisticResponse: {
      sendFriendRequest: {
        id: 'temp-id',
        createdBy: {
          ...user,
        },
        isCreator: true,
        status: RequestStatus.Sent,
        recipient: {
          __typename: 'Stranger',
          id: stranger.id,
        },
      },
    },
    update: (cache, { data: { sendFriendRequest } }) => {
      cache.writeFragment({
        id: `Stranger:${stranger.id}`,
        fragment: StrangerInfoFragmentDoc,
        fragmentName: 'StrangerInfo',
        data: {
          friendRequest: sendFriendRequest,
        },
      });
    },
  });

  return (
    <ActionIcon
      type="button"
      onClick={() => {
        sendFriendRequest({
          variables: {
            friendId: stranger.id,
          },
        });
      }}
    >
      <UserPlus />
    </ActionIcon>
  );
};

export default StrangerMenu;
