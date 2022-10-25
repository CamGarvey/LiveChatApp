import { gql } from '@apollo/client';
import { ActionIcon, Group, Menu, Stack, Text } from '@mantine/core';
import { IconX } from '@tabler/icons';
import { UserAvatar } from 'components/shared/Avatars';
import { AlertComponentAlertFragment } from 'graphql/generated/graphql';
import useAckAlert from 'hooks/useAckAlert';
import moment from 'moment';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  alert: AlertComponentAlertFragment;
};

const Alert = ({ alert }: Props) => {
  const navigate = useNavigate();
  const [acknowledgeAlert] = useAckAlert();

  const message = useMemo(() => {
    const username = alert.createdBy.username;

    switch (alert.__typename) {
      case 'ChatAdminAccessGrantedAlert':
        return `${username} added you as an admin in ${
          alert.chat.__typename === 'GroupChat' && alert.chat.name
        }`;
      case 'ChatAdminAccessRevokedAlert':
        return `${username} removed you as an admin in ${
          alert.chat.__typename === 'GroupChat' && alert.chat.name
        }`;
      case 'ChatMemberAccessGrantedAlert':
        return `${username} added you as a member in ${
          alert.chat.__typename === 'GroupChat' && alert.chat.name
        }`;
      case 'ChatMemberAccessRevokedAlert':
        return `${username} removed you as a member in ${
          alert.chat.__typename === 'GroupChat' && alert.chat.name
        }`;
      case 'RequestAcceptedAlert':
        return alert.request.__typename === 'FriendRequest'
          ? `${username} accepted your friend request`
          : '';
    }
  }, [alert]);

  const textStyle = {
    lineHeight: 1.1,
  };

  return (
    <Menu.Item
      onClick={() => {
        if (
          alert.__typename === 'ChatAdminAccessGrantedAlert' ||
          alert.__typename === 'ChatMemberAccessGrantedAlert'
        ) {
          navigate(`/chats/${alert.chat.id}`);
          acknowledgeAlert({
            variables: {
              alertId: alert.id,
            },
          });
        }
      }}
    >
      <Group
        sx={{
          justifyContent: 'space-between',
          flexFlow: 'nowrap',
        }}
      >
        <Group sx={{ flexFlow: 'nowrap' }}>
          <UserAvatar size="sm" user={alert.createdBy} />
          <Stack spacing={2}>
            <Text size={'xs'} sx={textStyle}>
              {message}
            </Text>
            <Text size={'xs'} color={'blue'} sx={textStyle}>
              {moment(alert.createdAt).fromNow()}
            </Text>
          </Stack>
        </Group>
        <ActionIcon
          size={'xs'}
          onClick={() => {
            acknowledgeAlert({
              variables: {
                alertId: alert.id,
              },
            });
          }}
        >
          <IconX />
        </ActionIcon>
      </Group>
    </Menu.Item>
  );
};

Alert.fragments = {
  alert: gql`
    fragment AlertComponentAlert on Alert {
      id
      createdAt
      createdById
      isCreator
      createdBy {
        ...UserAvatar
        username
      }
      ... on ChatAccessAlert {
        chat {
          id
          ... on GroupChat {
            name
          }
        }
      }
      ... on RequestResponseAlert {
        request {
          id
        }
      }
    }
    ${UserAvatar.fragments.user}
  `,
};

export default Alert;
