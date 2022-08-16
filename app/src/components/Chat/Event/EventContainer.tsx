import { motion } from 'framer-motion';
import EventTime from './EventTime';
import moment from 'moment';
import { Stack } from '@mantine/core';

type EventData = {
  createdAt: string;
  isCreator: boolean;
};

type Props = {
  eventData: EventData;
  event: JSX.Element;
  displayEventTime: boolean;
};

const EventContainer = ({ event, eventData, displayEventTime }: Props) => {
  return (
    <Stack>
      {displayEventTime && <EventTime time={moment(eventData.createdAt)} />}
      <motion.div
        key={eventData.createdAt}
        variants={{
          hidden: {
            x: eventData.isCreator ? 200 : -200,
          },
          show: {
            x: 0,
          },
        }}
        style={{
          display: 'flex',
          justifyContent: eventData.isCreator ? 'right' : 'left',
          overflowX: 'hidden',
        }}
      >
        {event}
      </motion.div>
    </Stack>
  );
};

export default EventContainer;
