import { gql } from '@apollo/client';
import { Group } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import UserAvatar from 'components/shared/UserAvatar';
import { motion } from 'framer-motion';
import { IncomingEventFragment } from 'graphql/generated/graphql';
import { useState } from 'react';
import EventInfo from './EventInfo';

const MotionGroup = motion(Group);

type Props = {
  event: IncomingEventFragment;
  displayAvatar: boolean;
  children: JSX.Element;
};

const IncomingEvent = ({ event, displayAvatar, children }: Props) => {
  const [isHovered, setHovered] = useState(false);

  return (
    <MotionGroup
      pb={3}
      variants={{
        hidden: {
          x: -200, // off screen to the left
        },
        show: {
          x: 0, // show on screen
        },
      }}
      style={{
        gap: '3px',
        overflowX: 'hidden',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <UserAvatar
        user={event.createdBy}
        style={{ marginTop: 'auto' }}
        sx={{
          visibility: displayAvatar ? 'visible' : 'hidden',
        }}
      />
      <Group
        spacing={5}
        px={10}
        sx={{
          overflow: 'hidden',
        }}
      >
        {children}
        <MotionGroup
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isHovered ? 1 : 0, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          spacing={2}
        >
          <EventInfo event={event} show={isHovered} />
        </MotionGroup>
      </Group>
    </MotionGroup>
  );
};

IncomingEvent.fragments = {
  event: gql`
    fragment IncomingEvent on Event {
      id
      ...EventInfo
      createdBy {
        id
        ...UserAvatar
      }
    }
    ${EventInfo.fragments.event}
    ${UserAvatar.fragments.user}
  `,
};

export default IncomingEvent;
