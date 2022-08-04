import { ActionIcon, Menu } from '@mantine/core';
import { MailForward } from 'tabler-icons-react';
import { useCancelFriendRequestMutation } from '../../../graphql/generated/graphql';

type Props = {
  request: {
    id: string;
  };
};

const FriendRequestSentMenu = ({ request }: Props) => {
  const [cancelFriendRequest] = useCancelFriendRequestMutation();

  return (
    <Menu
      control={
        <ActionIcon type="button">
          <MailForward />
        </ActionIcon>
      }
    >
      <Menu.Item
        onClick={() => {
          cancelFriendRequest({
            variables: {
              friendRequestId: request.id,
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
