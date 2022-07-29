import { Group, Avatar, Tooltip, ActionIcon, Stack, Text } from '@mantine/core';
import moment from 'moment';
import { CircleX, CircleCheck } from 'tabler-icons-react';
import {
  FriendRequest as FriendRequestObject,
  useAcceptFriendRequestMutation,
  useDeclineFriendRequestMutation,
} from '../../graphql/generated/graphql';

type Props = {
  request: FriendRequestObject;
};

const FriendRequest = ({ request }: Props) => {
  const [acceptRequest] = useAcceptFriendRequestMutation();
  const [declineRequest] = useDeclineFriendRequestMutation();
  const createdBy = request.createdBy;

  return (
    <Group
    // sx={(theme) => ({
    //   ':hover': {
    //     background:
    //       theme.colorScheme === 'dark' ? theme.colors.dark['1'] : '#f2f2f4',
    //   },
    // })}
    >
      <Avatar
        size="sm"
        src={`https://avatars.dicebear.com/api/initials/${createdBy.username}.svg`}
      />
      <Stack spacing={0}>
        <Text size={'sm'}>{createdBy.username}</Text>
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
              declineRequest({
                variables: {
                  friendRequestId: request.id,
                },
              });
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
              acceptRequest({
                variables: {
                  friendRequestId: request.id,
                },
              });
            }}
          >
            <CircleCheck />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Group>
  );
};

export default FriendRequest;
