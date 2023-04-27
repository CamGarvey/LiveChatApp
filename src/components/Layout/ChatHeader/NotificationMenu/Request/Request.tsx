import { gql } from '@apollo/client';
import { Stack, Text } from '@mantine/core';
import UserAvatar from 'components/shared/Avatars/UserAvatar';
import { useRequest, useStranger } from 'hooks';

import { RequestComponentFragment } from 'graphql/generated/graphql';
import { useMemo } from 'react';
import Notification from '../Notification';
import RemoveNotificationAction from '../RemoveNotificationAction';
import RequestResponseActions from './RequestResponseActions';

type Props = {
  request: RequestComponentFragment;
};

const Request = ({ request }: Props) => {
  const { accept, decline, del } = useRequest();

  const requestType = useMemo(() => request.__typename?.split(/(?=[A-Z])/).join(' '), [request]);

  const user = useMemo(() => {
    switch (request.state) {
      case 'SENT':
      case 'CANCELLED':
        return request.recipient;
      case 'ACCEPTED':
      case 'DECLINED':
        return request.createdBy;
      default:
        throw new Error('Unsupported request state');
    }
  }, [request]);

  const textSx = {
    lineHeight: 1.1,
  };

  return (
    <Notification
      user={user}
      createdAt={request.createdAt}
      actions={
        request.state === 'SENT' ? (
          <RequestResponseActions
            onAccept={() => {
              accept(request.id);
            }}
            onDecline={() => {
              decline(request.id);
            }}
          />
        ) : (
          <RemoveNotificationAction
            onRemove={() => {
              del(request.id);
            }}
          />
        )
      }
      textProps={{
        sx: textSx,
      }}
    >
      <Stack spacing={4}>
        <Text sx={textSx} size={'xs'}>
          {requestType} {request.state}
        </Text>
        <Text sx={textSx} size={'xs'}>
          {request.createdBy.username}
        </Text>
      </Stack>
    </Notification>
  );
};

Request.fragments = {
  request: gql`
    fragment RequestComponent on Request {
      id
      state
      createdAt
      createdById
      isCreator
      createdBy {
        id
        ...UserAvatar
      }
      recipient {
        id
        ...UserAvatar
      }
    }
    ${useStranger.fragments.user}
    ${UserAvatar.fragments.user}
  `,
};

export default Request;
