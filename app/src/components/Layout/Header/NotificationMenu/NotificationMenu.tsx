import { ActionIcon, Center, Indicator, Menu, ScrollArea } from '@mantine/core';
import { IconBell } from '@tabler/icons';
import { useLiveNotifications } from 'context/LiveNotificationsContext';
import {
  ChatAccessAlertComponentFragment,
  FriendRequestComponentFragment,
} from 'graphql/generated/graphql';
import { useMemo } from 'react';
import ChatAccessAlert from './ChatAccessAlert';
import FriendRequest from './FriendRequest';

type Props = {
  size?: number;
};

const NotificationMenu = ({ size = 16 }: Props) => {
  const { notifications } = useLiveNotifications();

  const friendRequests = useMemo(
    () =>
      (notifications?.filter(
        (x) => x.__typename === 'FriendRequest'
      ) as FriendRequestComponentFragment[]) ?? [],
    [notifications]
  );
  const chatAccessAlerts = useMemo(
    () =>
      (notifications?.filter(
        (x) =>
          x.__typename &&
          [
            'ChatAdminAccessRevokedAlert',
            'ChatAdminAccessGrantedAlert',
            'ChatMemberAccessRevokedAlert',
            'ChatMemberAccessGrantedAlert',
            'ChatCreatedAlert',
          ].includes(x.__typename)
      ) as ChatAccessAlertComponentFragment[]) ?? [],
    [notifications]
  );

  console.log({
    chatAccessAlerts,
  });

  const totalNotificationsCount =
    friendRequests.length + chatAccessAlerts.length;
  return (
    <Menu width={'max-content'} shadow="md">
      <Menu.Target>
        <Indicator
          color={'red'}
          label={totalNotificationsCount}
          disabled={totalNotificationsCount === 0}
        >
          <ActionIcon variant="default">
            <IconBell size={size} />
          </ActionIcon>
        </Indicator>
      </Menu.Target>
      <Menu.Dropdown>
        {totalNotificationsCount !== 0 ? (
          <ScrollArea
            sx={{
              height: '300px',
            }}
            offsetScrollbars
          >
            {friendRequests.length !== 0 && (
              <>
                <Menu.Label>
                  <Center>Friend Requests</Center>
                </Menu.Label>
                {friendRequests.map((request) => (
                  <Menu.Item key={request.id}>
                    <FriendRequest key={request.id} request={request} />
                  </Menu.Item>
                ))}
              </>
            )}
            {chatAccessAlerts.length !== 0 && (
              <>
                <Menu.Label>
                  <Center>Chat Alerts</Center>
                </Menu.Label>
                {chatAccessAlerts.map((alert) => (
                  <Menu.Item key={alert.id}>
                    <ChatAccessAlert key={alert.id} alert={alert} />
                  </Menu.Item>
                ))}
              </>
            )}
          </ScrollArea>
        ) : (
          <Menu.Label>
            <Center>No notifications</Center>
          </Menu.Label>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

export default NotificationMenu;
