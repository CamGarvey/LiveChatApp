import { ChatAccessAlertComponentFragment } from 'graphql/generated/graphql';
import { Group, Stack, Text } from '@mantine/core';
import moment from 'moment';
import { UserAvatar } from 'components/shared/Avatars';
import { gql } from '@apollo/client';

type Props = {
  alert: ChatAccessAlertComponentFragment;
};

const ChatAccessAlert = ({ alert }: Props) => {
  return (
    <Group>
      <UserAvatar size="sm" user={alert.createdBy} />
      <Stack spacing={0}>
        <Text size={'sm'}>{alert.createdBy.username}</Text>
        <Text>added you as a member</Text>
        <Text size={'sm'} color={'blue'}>
          {moment(alert.createdAt).fromNow()}
        </Text>
      </Stack>
    </Group>
  );
};

ChatAccessAlert.fragments = {
  chat: gql`
    fragment ChatAccessAlertComponent on ChatAccessAlert {
      id
      createdAt
      createdById
      isCreator
      createdBy {
        id
        ...UserAvatar
      }
      chat {
        ... on GroupChat {
          name
        }
      }
    }
    ${UserAvatar.fragments.user}
  `,
};

export default ChatAccessAlert;
