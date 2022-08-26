import { Group, Tooltip, ActionIcon, Stack, Text } from '@mantine/core';
import moment from 'moment';
import { CircleX, CircleCheck } from 'tabler-icons-react';
import { FriendRequestNotificationFragment } from 'graphql/generated/graphql';
import UserAvatar from 'components/shared/UserAvatar';
import { gql } from '@apollo/client';
import { useFriendRequest } from 'hooks';

type Props = {
  request: FriendRequestNotificationFragment;
};

const FriendRequestNotification = ({ request }: Props) => {
  const { acceptRequest, declineRequest } = useFriendRequest();

  return (
    <Group>
      <UserAvatar size="sm" user={request.createdBy} />
      <Stack spacing={0}>
        <Text size={'sm'}>{request.createdBy.username}</Text>
        <Text size={'sm'} color={'blue'}>
          {moment(request.createdAt).fromNow()}
        </Text>
      </Stack>
      <Group ml={'auto'} pr={'3px'}>
        <Tooltip label="Decline" openDelay={200} withArrow>
          <ActionIcon
            sx={{
              ':hover': {
                background: '#d2dbff',
              },
            }}
            onClick={() => {
              declineRequest(request.id);
            }}
          >
            <CircleX />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Accept" openDelay={200} withArrow>
          <ActionIcon
            sx={{
              ':hover': {
                background: '#d2dbff',
              },
            }}
            onClick={() => {
              acceptRequest(request.id);
            }}
          >
            <CircleCheck />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Group>
  );
};

FriendRequestNotification.fragments = {
  request: gql`
    fragment FriendRequestNotification on FriendRequest {
      id
      createdAt
      createdById
      recipientId
      status
      createdBy {
        id
        ...UserAvatar
      }
    }
    ${UserAvatar.fragments.user}
  `,
};

export default FriendRequestNotification;
