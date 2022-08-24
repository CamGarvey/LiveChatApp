import { gql } from '@apollo/client';
import { ActionIcon, Menu, Text, Tooltip } from '@mantine/core';
import { UserMenuFragment } from 'graphql/generated/graphql';
import { Mailbox, MailForward, UserCircle, UserPlus } from 'tabler-icons-react';

type Props = {
  user: UserMenuFragment;
};

const UserMenu = ({ user }: Props) => {
  return (
    <Menu>
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
                  <Text>Accept</Text>
                  <Text>Decline</Text>
                </>
              )}
              {user.status === 'REQUEST_SENT' && (
                <Text>Cancel Friend Request</Text>
              )}
              {user.status === 'NO_REQUEST' && <Text>Send Friend Request</Text>}
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
      __typename
      ... on Stranger {
        status
      }
    }
  `,
};

export default UserMenu;
