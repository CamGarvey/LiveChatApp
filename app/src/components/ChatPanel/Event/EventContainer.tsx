import EventTime from './EventTime';
import moment from 'moment';
import { Stack } from '@mantine/core';
import { gql } from '@apollo/client';

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
    <Stack className={'event-container'}>
      {displayEventTime && <EventTime time={moment(eventData.createdAt)} />}
      <div
        style={{
          overflowX: 'hidden',
        }}
      >
        {event}
      </div>
    </Stack>
  );
};

EventContainer.fragments = {
  event: gql`
    fragment EventContainer on Event {
      id
      createdAt
      isCreator
    }
  `,
};

export default EventContainer;
