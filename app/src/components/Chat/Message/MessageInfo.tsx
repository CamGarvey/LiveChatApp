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
};

const MessageInfo = ({ createdBy, createdAt, isCreator }: Props) => {
  const createdAtFormatted = useMemo(
    () => moment(createdAt).format('HH:mm do MMM YYYY'),
    [createdAt]
  );
  return (
    <Stack spacing={2}>
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

export default MessageInfo;
