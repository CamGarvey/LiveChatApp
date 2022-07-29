import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { motion } from 'framer-motion';
import { ActionIcon, Group, Text, Title } from '@mantine/core';
import { useIsDrawerOpen } from '../../store';
import { useMediaQuery } from '@mantine/hooks';
import { Settings } from 'tabler-icons-react';
import { useChat } from '../../../context/ChatContext';
import { useUpdateGroupChatModal } from '../../Modals/UpdateGroupChatModal';

const AnimatedTitle = () => {
  const { chat } = useChat();
  const openGroupChatUpdate = useUpdateGroupChatModal();
  const isLargerScreen = useMediaQuery('(min-width: 993px)');
  const isSmallScreen = useMediaQuery('(max-width: 500px)');
  const isDrawerOpen = useIsDrawerOpen();

  return (
    <AnimatePresence custom={isDrawerOpen} exitBeforeEnter>
      <motion.div
        key={isDrawerOpen ? 'ham' : 'chat'}
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        exit={{ y: -200 }}
        style={{ margin: 0 }}
        transition={{ type: 'spring', bounce: 0.2, duration: 0.2 }}
      >
        {isDrawerOpen || isLargerScreen || chat == null ? (
          <Title order={isSmallScreen ? 3 : 2}>Ham's Chat</Title>
        ) : (
          <Group spacing={2}>
            {chat && chat.__typename === 'GroupChat' ? (
              <ActionIcon
                size={'xs'}
                color={'blue'}
                onClick={() => openGroupChatUpdate({ chat })}
              >
                <Settings />
              </ActionIcon>
            ) : (
              <></>
            )}
            <Text>{chat?.__typename === 'GroupChat' ? chat?.name : ''}</Text>
          </Group>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedTitle;
