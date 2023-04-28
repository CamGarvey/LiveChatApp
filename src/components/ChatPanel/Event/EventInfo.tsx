import { gql } from '@apollo/client';
import { Stack, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { EventInfoFragment } from 'graphql/generated/graphql';
import moment from 'moment';
import { useMemo } from 'react';

type Props = {
  event: EventInfoFragment;
  align?: 'self-start' | 'self-end';
};

const EventInfo = ({ event, align = 'self-start' }: Props) => {
  const isLargeScreen = useMediaQuery('(min-width: 470px)');

  const formattedCreatedAt = useMemo(() => {
    let format = isLargeScreen ? 'HH:mm do MMM YYYY' : 'HH:mm';
    return moment(event.createdAt).format(format);
  }, [event.createdAt, isLargeScreen]);

  return (
    <Stack spacing={2} align={align}>
      {isLargeScreen && (
        <Text color={'dimmed'} size={'sm'}>
          {event.createdBy.username}
          {event.isCreator && ' (YOU)'}
        </Text>
      )}
      <Text color={'dimmed'} size={'sm'}>
        {formattedCreatedAt}
      </Text>
    </Stack>
  );
};

EventInfo.fragments = {
  event: gql`
    fragment EventInfo on Event {
      id
      createdAt
      createdBy {
        id
        username
      }
      isCreator
    }
  `,
};

export default EventInfo;
