import { Group, Tooltip, ActionIcon, Stack, Text, Menu } from '@mantine/core';
import moment from 'moment';
import { IconCircleX, IconCircleCheck } from '@tabler/icons';
import { FriendRequestComponentRequestFragment } from 'graphql/generated/graphql';
import UserAvatar from 'components/shared/Avatars/UserAvatar';
import { gql } from '@apollo/client';
import { useStranger } from 'hooks';
import { useRequest } from 'hooks';

type Props = {
  request: FriendRequestComponentRequestFragment;
};

export const FriendRequest = ({ request }: Props) => {
  const { accept, decline } = useRequest();

  const textStyle = {
    lineHeight: 1.1,
  };

  return (
    <Menu.Item>
      <Group
        sx={{
          justifyContent: 'space-between',
          flexFlow: 'nowrap',
        }}
      >
        <UserAvatar size="sm" user={request.createdBy} />
        <Stack spacing={2}>
          <Text sx={textStyle} size={'xs'}>
            Friend Request
          </Text>
          <Text sx={textStyle} size={'xs'}>
            {request.createdBy.username}
          </Text>
          <Text sx={textStyle} size={'xs'} color={'blue'}>
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
                decline(request.id);
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
                accept(request.id);
              }}
            >
              <IconCircleCheck />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
    </Menu.Item>
  );
};

FriendRequest.fragments = {
  request: gql`
    fragment FriendRequestComponentRequest on FriendRequest {
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
