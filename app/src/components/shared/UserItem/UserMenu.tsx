import { gql } from '@apollo/client';
import { ActionIcon, Menu, Tooltip } from '@mantine/core';
import { UserMenuFragment } from 'graphql/generated/graphql';
import { useRequest } from 'hooks';
import {
  IconMailbox,
  IconMailForward,
  IconPlus,
  IconMinus,
  IconUserCircle,
  IconUserMinus,
  IconUserPlus,
} from '@tabler/icons';
import { useMemo } from 'react';

type StrangerStatus = 'REQUEST_RECEIVED' | 'REQUEST_SENT' | 'NO_REQUEST';

type Props = {
  user: UserMenuFragment;
  target?: {
    icon?: React.ReactNode;
  };
  items?: React.ReactNode;
  loading?: boolean;
  iconSize?: number;
};

const UserMenu = ({
  user,
  iconSize = 14,
  target,
  items,
  loading = false,
}: Props) => {
  const {
    cancelRequest,
    sendRequest,
    acceptRequest,
    declineRequest,
    loading: loadingRequest,
  } = useRequest();

  const status = useMemo<StrangerStatus>(() => {
    if (user.__typename === 'Stranger' && user.friendRequest) {
      if (['SENT', 'SEEN'].includes(user.friendRequest.state)) {
        return user.friendRequest.isCreator
          ? 'REQUEST_SENT'
          : 'REQUEST_RECEIVED';
      }
    }
    return 'NO_REQUEST';
  }, [user]);

  return (
    <Menu width={'max-content'}>
      <Menu.Target>
        <Tooltip hidden={!!user} label={!user && 'Failed to load user'}>
          <ActionIcon loading={loadingRequest || loading}>
            {target?.icon ? (
              <>{target.icon}</>
            ) : (
              <>
                {user.__typename === 'Stranger' && (
                  <>
                    {status === 'REQUEST_RECEIVED' && <IconMailbox />}
                    {status === 'REQUEST_SENT' && <IconMailForward />}
                    {status === 'NO_REQUEST' && <IconUserPlus />}
                  </>
                )}
                {user.__typename === 'Friend' && <IconUserCircle />}
              </>
            )}
          </ActionIcon>
        </Tooltip>
      </Menu.Target>
      {user && (
        <Menu.Dropdown>
          {user.__typename === 'Friend' && (
            <Menu.Item
              color={'red'}
              icon={<IconUserMinus size={iconSize} />}
              // onClick={() => deleteFriend(user.id)}
            >
              UnFriend
            </Menu.Item>
          )}
          {user.__typename === 'Stranger' && (
            <>
              {status === 'REQUEST_RECEIVED' && (
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
              {status === 'REQUEST_SENT' && (
                <Menu.Item
                  disabled={user.friendRequest === null}
                  onClick={() => cancelRequest(user.friendRequest!.id)}
                >
                  Cancel Friend Request
                </Menu.Item>
              )}
              {status === 'NO_REQUEST' && (
                <Menu.Item
                  icon={<IconMailForward size={iconSize} />}
                  onClick={() => sendRequest(user.id)}
                >
                  Send Friend Request
                </Menu.Item>
              )}
            </>
          )}
          {items && (
            <>
              <Menu.Divider />
              {items}
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
        friendRequest {
          id
          isCreator
          createdById
          recipientId
          state
        }
      }
    }
  `,
};

export default UserMenu;
