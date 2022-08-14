import { Group } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { motion } from 'framer-motion';
import { useState } from 'react';
import EventAvatar from './EventAvatar';
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
    <Group pb={3}>
      <EventAvatar username={createdBy.username} isVisible={displayAvatar} />
      <MotionGroup
        transition={{ delay: 1 }}
        style={{ maxWidth: largeScreen ? '600px' : '400px', gap: '3px' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Group spacing={5}>
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
    </Group>
  );
};

export default IncomingEvent;
