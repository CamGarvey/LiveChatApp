import { ActionIcon, Menu } from '@mantine/core';
import { MailForward } from 'tabler-icons-react';
import { useUser } from 'context/UserContext';
import {
  RequestStatus,
  useCancelFriendRequestMutation,
} from 'graphql/generated/graphql';

type Props = {
  requestId: string;
  recipientId: string;
};

const FriendRequestSentMenu = ({ requestId, recipientId }: Props) => {
  const { user } = useUser();
  const [cancelFriendRequest] = useCancelFriendRequestMutation({
    optimisticResponse: {
      cancelFriendRequest: {
        id: requestId,
        isCreator: true,
        status: RequestStatus.Cancelled,
        createdById: user.id,
        recipientId: recipientId,
        createdBy: {
          __typename: 'Me',
          id: user.id,
        },
        recipient: {
          id: recipientId,
        },
      },
    },
  });

  return (
    <Menu>
      <Menu.Target>
        <ActionIcon type="button">
          <MailForward />
        </ActionIcon>
      </Menu.Target>
      <Menu.Item
        onClick={() => {
          cancelFriendRequest({
            variables: {
              friendRequestId: requestId,
            },
          });
        }}
      >
        Cancel Friend Request
      </Menu.Item>
    </Menu>
  );
};

export default FriendRequestSentMenu;
