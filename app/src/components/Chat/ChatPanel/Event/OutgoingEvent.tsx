import { gql } from '@apollo/client';
import { Group, Loader, Tooltip } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { motion } from 'framer-motion';
import { OutgoingEventFragment } from 'graphql/generated/graphql';
import { useState } from 'react';
import EventInfo from './EventInfo';

type Props = {
  state: 'sending' | 'sent';
  event: OutgoingEventFragment;
  children: JSX.Element;
  actions?: JSX.Element;
};

const MotionGroup = motion(Group);

const OutgoingEvent = ({ state, children, event, actions }: Props) => {
  const [isHovered, setHovered] = useState(false);
  const largeScreen = useMediaQuery('(min-width: 1200px)');
  return (
    <MotionGroup
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isHovered ? 1 : 0, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          spacing={2}
        >
          <EventInfo show={isHovered} event={event} align={'self-end'} />
          <Group>{actions}</Group>
        </MotionGroup>
        {children}
        {state === 'sending' && (
          <Tooltip label={'Sending...'} mt={'auto'}>
            <Loader size={8} />
          </Tooltip>
        )}
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
