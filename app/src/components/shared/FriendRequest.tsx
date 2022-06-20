import { Group, Avatar, Tooltip, ActionIcon, Stack, Text } from '@mantine/core';
import { CircleX, CircleCheck } from 'tabler-icons-react';
import {
  useAcceptFriendRequestMutation,
  useDeclineFriendRequestMutation,
} from '../../graphql/generated/graphql';

type Props = {
  id: string;
  name?: string;
  username: string;
};

const FriendRequest = ({ id, name, username }: Props) => {
  const [acceptRequest] = useAcceptFriendRequestMutation();
  const [declineRequest] = useDeclineFriendRequestMutation();

  return (
    <Group>
      <Avatar
        size="sm"
        src={`https://avatars.dicebear.com/api/initials/${username}.svg`}
      />
      <Stack spacing={0}>
        <Text>{name}</Text>
        <Text>{username}</Text>
      </Stack>

      <Group ml={'auto'}>
        <Tooltip label="Decline" openDelay={200} withArrow>
          <ActionIcon
            onClick={() => {
              declineRequest({
                variables: {
                  friendId: id,
                },
              });
            }}
          >
            <CircleX />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Accept" openDelay={200} withArrow>
          <ActionIcon
            onClick={() => {
              acceptRequest({
                variables: {
                  friendId: id,
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
