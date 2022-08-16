import { ActionIcon, Menu } from '@mantine/core';
import { UserPlus } from 'tabler-icons-react';
import { useUser } from '../../../context/UserContext';
import {
  RequestStatus,
  StrangerInfoFragment,
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
        createdBy: user,
        createdById: user.id,
        isCreator: true,
        recipientId: stranger.id,
        status: RequestStatus.Sent,
        recipient: {
          id: stranger.id,
        },
      },
    },
    update: (cache, { data: { sendFriendRequest } }) => {
      console.log({ sendFriendRequest });

      cache.updateFragment<StrangerInfoFragment>(
        {
          id: `User:${stranger.id}`,
          fragment: StrangerInfoFragmentDoc,
          fragmentName: 'StrangerInfo',
        },
        (data) => ({ ...data, friendRequest: sendFriendRequest })
      );
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
