import { Group, Loader, Tooltip } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { motion } from 'framer-motion';
import { useState } from 'react';
import EventInfo from './EventInfo';

type Props = {
  state: 'sending' | 'sent';
  createdBy: {
    username: string;
  };
  createdAt: string;
  children: JSX.Element;
  actions?: JSX.Element;
};

const MotionGroup = motion(Group);

const OutgoingEvent = ({
  state,
  children,
  createdAt,
  createdBy,
  actions,
}: Props) => {
  const [isHovered, setHovered] = useState(false);
  const largeScreen = useMediaQuery('(min-width: 1200px)');
  return (
    <MotionGroup
      pb={3}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: 1 }}
      style={{ maxWidth: largeScreen ? '600px' : '400px', gap: '3px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Group spacing={5}>
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
            isCreator={true}
            align={'self-end'}
          />
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
export default OutgoingEvent;
