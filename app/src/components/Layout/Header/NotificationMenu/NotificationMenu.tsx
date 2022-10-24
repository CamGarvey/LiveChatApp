import { gql } from '@apollo/client';
import {
  ActionIcon,
  Center,
  Indicator,
  Menu,
  ScrollArea,
  Stack,
} from '@mantine/core';
import { IconBell } from '@tabler/icons';
import { useLiveNotifications } from 'context/LiveNotificationsContext';
import Notification from './Notification';

type Props = {
  size?: number;
};

const NotificationMenu = ({ size = 16 }: Props) => {
  const { notifications } = useLiveNotifications();

  return (
    <Menu width={'max-content'} shadow="md">
      <Menu.Target>
        <Indicator
          color={'red'}
          label={notifications.length}
          disabled={notifications.length === 0}
        >
          <ActionIcon variant="default">
            <IconBell size={size} />
          </ActionIcon>
        </Indicator>
      </Menu.Target>
      <Menu.Dropdown>
        {notifications.length !== 0 ? (
          <>
            <Menu.Label>
              <Center>Notifications</Center>
            </Menu.Label>
            <ScrollArea
              sx={{
                width: '300px',
              }}
              offsetScrollbars
            >
              <Stack
                sx={{
                  maxHeight: '300px',
                }}
              >
                {notifications.map((notification) => (
                  <Notification
                    key={notification.id}
                    notification={notification}
                  />
                ))}
              </Stack>
            </ScrollArea>
          </>
        ) : (
          <Menu.Label>
            <Center>No notifications</Center>
          </Menu.Label>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

NotificationMenu.fragments = {
  notification: gql`
    fragment NotificationMenuRequest on Notification {
      ...NotificationComponentNotification
    }
    ${Notification.fragments.notification}
  `,
};

export default NotificationMenu;
