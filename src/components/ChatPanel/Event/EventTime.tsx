import { Center, Text } from '@mantine/core';
import moment from 'moment';
import { formatEventTime } from 'utils';

type Props = {
  time: moment.Moment;
};

const EventTime = ({ time }: Props) => {
  return (
    <Center>
      <Text color={'dimmed'}>{formatEventTime(time)}</Text>
    </Center>
  );
};

export default EventTime;
