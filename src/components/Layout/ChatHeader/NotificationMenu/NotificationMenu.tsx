import { gql } from '@apollo/client';
import { ActionIcon, Center, Indicator, Menu, ScrollArea, Stack } from '@mantine/core';
import { IconBell } from '@tabler/icons';
import { useLiveNotifications } from 'context/LiveNotificationsContext';
import Request from './Request/Request';

type Props = {
  size?: number;
};

const NotificationMenu = ({ size = 16 }: Props) => {
  const { requests } = useLiveNotifications();

  return (
    <Menu width={'max-content'} shadow="md">
      <Menu.Target>
        <Indicator color={'red'} label={requests.length} disabled={requests.length === 0} size={14}>
          <ActionIcon variant="default">
            <IconBell size={size} />
          </ActionIcon>
        </Indicator>
      </Menu.Target>
      <Menu.Dropdown>
        <ScrollArea
          sx={{
            width: '300px',
          }}
          offsetScrollbars
        >
          {requests.length !== 0 ? (
            <>
              <Menu.Label>
                <Center>Requests</Center>
              </Menu.Label>

              <Stack
                sx={{
                  maxHeight: '300px',
                }}
              >
                {requests.map((request) => (
                  <Request key={request.id} request={request} />
                ))}
              </Stack>
            </>
          ) : (
            <Menu.Label>
              <Center>No notifications</Center>
            </Menu.Label>
          )}
        </ScrollArea>
      </Menu.Dropdown>
    </Menu>
  );
};

NotificationMenu.fragments = {
  request: gql`
    fragment NotificationMenuRequest on Request {
      ...RequestComponent
    }
    ${Request.fragments.request}
  `,
};

export default NotificationMenu;
