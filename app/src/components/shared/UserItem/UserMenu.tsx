import { gql } from '@apollo/client';
import { ActionIcon, Menu, Text, Tooltip } from '@mantine/core';
import { UserMenuFragment } from 'graphql/generated/graphql';
import { useFriendRequest } from 'hooks';
import { Mailbox, MailForward, UserCircle, UserPlus } from 'tabler-icons-react';

type Props = {
  user: UserMenuFragment;
};

const UserMenu = ({ user }: Props) => {
  const { cancelRequest, sendRequest, acceptRequest, declineRequest } =
    useFriendRequest();
  return (
    <Menu width={'max-content'}>
      <Menu.Target>
        <Tooltip label={!user && 'Failed to load user'}>
          <ActionIcon>
            {user.__typename === 'Stranger' && (
              <>
                {user.status === 'REQUEST_RECEIVED' && <Mailbox />}
                {user.status === 'REQUEST_SENT' && <MailForward />}
                {user.status === 'NO_REQUEST' && <UserPlus />}
              </>
            )}
            {user.__typename === 'Friend' && <UserCircle />}
          </ActionIcon>
        </Tooltip>
      </Menu.Target>
      {user && (
        <Menu.Dropdown>
          {user.__typename === 'Friend' && <Menu.Item>UnFriend</Menu.Item>}
          {user.__typename === 'Stranger' && (
            <>
              {user.status === 'REQUEST_RECEIVED' && (
                <>
                  <Menu.Item
                    disabled={user.friendRequest === null}
                    onClick={() => acceptRequest(user.friendRequest!.id)}
                  >
                    Accept
                  </Menu.Item>
                  <Menu.Item
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
                <Menu.Item onClick={() => sendRequest(user.id)}>
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
          status
          createdById
          recipientId
        }
      }
    }
  `,
};

export default UserMenu;
