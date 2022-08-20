import { Group } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import UserAvatar from 'components/shared/UserAvatar';
import { motion } from 'framer-motion';
import { useState } from 'react';
import EventInfo from './EventInfo';

const MotionGroup = motion(Group);

type Props = {
  createdBy: {
    id: string;
    username: string;
  };
  createdAt: string;
  displayAvatar: boolean;
  children: JSX.Element;
};

const IncomingEvent = ({
  createdBy,
  createdAt,
  displayAvatar,
  children,
}: Props) => {
  const [isHovered, setHovered] = useState(false);
  const largeScreen = useMediaQuery('(min-width: 1200px)');
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
        maxWidth: largeScreen ? '600px' : '400px',
        gap: '3px',
        overflowX: 'hidden',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <UserAvatar
        username={createdBy.username}
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
          <EventInfo
            show={isHovered}
            createdBy={createdBy}
            createdAt={createdAt}
            isCreator={false}
          />
        </MotionGroup>
      </Group>
    </MotionGroup>
  );
};

export default IncomingEvent;
