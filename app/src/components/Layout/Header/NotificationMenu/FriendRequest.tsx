import { Group, Tooltip, ActionIcon, Stack, Text } from '@mantine/core';
import moment from 'moment';
import { IconCircleX, IconCircleCheck } from '@tabler/icons';
import { FriendRequestComponentFragment } from 'graphql/generated/graphql';
import UserAvatar from 'components/shared/UserAvatar';
import { gql } from '@apollo/client';
import { useStranger } from 'hooks';
import useRequest from 'hooks/useRequest';

type Props = {
  request: FriendRequestComponentFragment;
};

const FriendRequest = ({ request }: Props) => {
  const { acceptRequest, declineRequest } = useRequest();

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
            <IconCircleX />
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
            <IconCircleCheck />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Group>
  );
};

FriendRequest.fragments = {
  request: gql`
    fragment FriendRequestComponent on FriendRequest {
      id
      createdAt
      createdById
      isCreator
      createdBy {
        id
        ...UserAvatar
      }
    }
    ${useStranger.fragments.user}
    ${UserAvatar.fragments.user}
  `,
};

export default FriendRequest;
