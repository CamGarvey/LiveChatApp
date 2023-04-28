import { Center, Text } from '@mantine/core';
import moment from 'moment';
import { useMemo } from 'react';
import { formatEventTime } from 'utils';

type Props = {
  time: moment.Moment;
};

const EventTime = ({ time }: Props) => {
  const formattedTime = useMemo(() => formatEventTime(time), [time]);

  return (
    <Center>
      <Text color={'dimmed'}>{formattedTime}</Text>
    </Center>
  );
};

export default EventTime;
