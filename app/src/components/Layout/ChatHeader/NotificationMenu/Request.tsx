import { Group, Tooltip, ActionIcon, Stack, Text, Menu } from '@mantine/core';
import moment from 'moment';
import { IconCircleX, IconCircleCheck } from '@tabler/icons';
import UserAvatar from 'components/shared/Avatars/UserAvatar';
import { gql } from '@apollo/client';
import { useStranger } from 'hooks';
import { useRequest } from 'hooks';

type Props = {
  request: RequestFragment;
};

export const Request = ({ request }: Props) => {
  const { acceptRequest, declineRequest } = useRequest();

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
            Request
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
    </Menu.Item>
  );
};

Request.fragments = {
  request: gql`
    fragment RequestComponentRequest on Request {
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