import { gql } from '@apollo/client';
import { ActionIcon, Menu, Tooltip } from '@mantine/core';
import { UserMenuFragment } from 'graphql/generated/graphql';
import { useFriendRequest } from 'hooks';
import {
  IconFriends,
  IconMailbox,
  IconFriendsOff,
  IconMailForward,
  IconPlus,
  IconMinus,
  IconUserCircle,
  IconUserMinus,
  IconUserPlus,
} from '@tabler/icons';

type Props = {
  user: UserMenuFragment;
  iconSize?: number;
};

const UserMenu = ({ user, iconSize = 14 }: Props) => {
  const {
    cancelRequest,
    sendRequest,
    acceptRequest,
    declineRequest,
    loadingAccept,
    loadingCancel,
    loadingDecline,
    loadingSend,
    deleteFriend,
    loadingDelete,
  } = useFriendRequest();

  const loading =
    loadingAccept ||
    loadingCancel ||
    loadingDecline ||
    loadingSend ||
    loadingDelete;

  return (
    <Menu width={'max-content'}>
      <Menu.Target>
        <Tooltip hidden={!!user} label={!user && 'Failed to load user'}>
          <ActionIcon loading={loading}>
            {user.__typename === 'Stranger' && (
              <>
                {user.status === 'REQUEST_RECEIVED' && <IconMailbox />}
                {user.status === 'REQUEST_SENT' && <IconMailForward />}
                {user.status === 'NO_REQUEST' && <IconUserPlus />}
              </>
            )}
            {user.__typename === 'Friend' && <IconUserCircle />}
          </ActionIcon>
        </Tooltip>
      </Menu.Target>
      {user && (
        <Menu.Dropdown>
          {user.__typename === 'Friend' && (
            <Menu.Item
              color={'red'}
              icon={<IconUserMinus size={iconSize} />}
              onClick={() => deleteFriend(user.id)}
            >
              UnFriend
            </Menu.Item>
          )}
          {user.__typename === 'Stranger' && (
            <>
              {user.status === 'REQUEST_RECEIVED' && (
                <>
                  <Menu.Label>Friend Request</Menu.Label>
                  <Menu.Item
                    color={'green'}
                    icon={<IconPlus size={iconSize} />}
                    disabled={user.friendRequest === null}
                    onClick={() => acceptRequest(user.friendRequest!.id)}
                  >
                    Accept
                  </Menu.Item>
                  <Menu.Item
                    color={'red'}
                    icon={<IconMinus size={iconSize} />}
                    disabled={user.friendRequest === null}
                    onClick={() => declineRequest(user.friendRequest!.id)}
                  >
                    Decline
                  </Menu.Item>
                </>
              )}
              {user.status === 'REQUEST_SENT' && (
                <Menu.Item
                  disabled={user.friendRequest === null}
                  onClick={() => cancelRequest(user.friendRequest!.id)}
                >
                  Cancel Friend Request
                </Menu.Item>
              )}
              {user.status === 'NO_REQUEST' && (
                <Menu.Item
                  icon={<IconMailForward size={iconSize} />}
                  onClick={() => sendRequest(user.id)}
                >
                  Send Friend Request
                </Menu.Item>
              )}
            </>
          )}
        </Menu.Dropdown>
      )}
    </Menu>
  );
};

UserMenu.fragments = {
  user: gql`
    fragment UserMenu on User {
      id
      ... on Stranger {
        status
        friendRequest {
          id
          createdById
          recipientId
          isCreator
        }
      }
    }
  `,
};

export default UserMenu;
