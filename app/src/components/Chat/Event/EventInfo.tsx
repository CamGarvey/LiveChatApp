import { gql } from '@apollo/client';
import { Stack, Text } from '@mantine/core';
import { EventInfoFragment } from 'graphql/generated/graphql';
import moment from 'moment';
import { useMemo } from 'react';

type Props = {
  event: EventInfoFragment;
  show: boolean;
  align?: 'self-start' | 'self-end';
};

const EventInfo = ({ event, show, align = 'self-start' }: Props) => {
  const createdAtFormatted = useMemo(
    () => moment(event.createdAt).format('HH:mm do MMM YYYY'),
    [event.createdAt]
  );
  return (
    <Stack spacing={2} align={align}>
      <Text color={'dimmed'} size={'sm'}>
        {event.createdBy.username}
        {event.isCreator && ' (YOU)'}
      </Text>
      <Text color={'dimmed'} size={'sm'}>
        {createdAtFormatted}
      </Text>
    </Stack>
  );
};

EventInfo.fragments = {
  event: gql`
    fragment EventInfo on Event {
      createdAt
      createdBy {
        username
      }
      isCreator
    }
  `,
};

export default EventInfo;
