import { Stack, Text } from '@mantine/core';
import moment from 'moment';
import { useMemo } from 'react';

type Props = {
  show: boolean;
  createdBy: {
    username: string;
  };
  createdAt: string;
  isCreator: boolean;
  align?: 'self-start' | 'self-end';
};

const EventInfo = ({
  createdBy,
  createdAt,
  isCreator,
  align = 'self-start',
}: Props) => {
  const createdAtFormatted = useMemo(
    () => moment(createdAt).format('HH:mm do MMM YYYY'),
    [createdAt]
  );
  return (
    <Stack spacing={2} align={align}>
      <Text color={'dimmed'} size={'sm'}>
        {createdBy.username}
        {isCreator && ' (YOU)'}
      </Text>
      <Text color={'dimmed'} size={'sm'}>
        {createdAtFormatted}
      </Text>
    </Stack>
  );
};

export default EventInfo;
