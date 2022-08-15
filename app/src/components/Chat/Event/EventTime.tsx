import { Center, Text } from '@mantine/core';
import moment from 'moment';
import { formatMessageTime } from 'utils';

type Props = {
  time: moment.Moment;
};

const EventTime = ({ time }: Props) => {
  return (
    <Center>
      <Text color={'dimmed'}>{formatMessageTime(time)}</Text>
    </Center>
  );
};

export default EventTime;
