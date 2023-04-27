import { gql } from '@apollo/client';
import { Group, Loader } from '@mantine/core';
import { motion } from 'framer-motion';
import { OutgoingEventFragment } from 'graphql/generated/graphql';
import { useState } from 'react';
import EventInfo from './EventInfo';

type Props = {
  state?: 'sending' | 'sent';
  event: OutgoingEventFragment;
  children: JSX.Element;
  actions?: JSX.Element;
};

const MotionGroup = motion(Group);

const OutgoingEvent = ({ state = 'sent', children, event, actions }: Props) => {
  const [isHovered, setHovered] = useState(false);

  return (
    <MotionGroup
      className={'outgoing'}
      pb={3}
      key={event.createdAt}
      variants={{
        hidden: {
          x: 200, // off screen to the right
        },
        show: {
          x: 0, // show on screen
        },
      }}
      style={{
        gap: '3px',
        display: 'flex',
        justifyContent: 'right',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Group
        spacing={5}
        px={10}
        sx={{
          overflow: 'hidden',
        }}
      >
        <MotionGroup
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          exit={{ opacity: 0 }}
          spacing={2}
        >
          <EventInfo event={event} align={'self-end'} />
          <Group>{actions}</Group>
        </MotionGroup>
        {children}
        {state === 'sending' && <Loader size={8} mt={'auto'} variant={'oval'} />}
      </Group>
    </MotionGroup>
  );
};

OutgoingEvent.fragments = {
  event: gql`
    fragment OutgoingEvent on Event {
      id
      ...EventInfo
    }
    ${EventInfo.fragments.event}
  `,
};

export default OutgoingEvent;
