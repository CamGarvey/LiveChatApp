import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { motion } from 'framer-motion';
import { ActionIcon, Box, Group, Stack, Text, Title } from '@mantine/core';
import { useIsDrawerOpen } from '../../store';
import { useMediaQuery } from '@mantine/hooks';
import { Settings } from 'tabler-icons-react';
import { useChat } from '../../../context/ChatContext';
import { useUpdateGroupChatModal } from '../../Modals/UpdateGroupChatModal';
import ChatUpdateAction from 'components/shared/ChatUpdateAction';

const AnimatedTitle = () => {
  const { chat } = useChat();
  const openGroupChatUpdate = useUpdateGroupChatModal();
  const isLargerScreen = useMediaQuery('(min-width: 793px)');
  const isSmallScreen = useMediaQuery('(max-width: 500px)');
  const isDrawerOpen = useIsDrawerOpen();

  return (
    <AnimatePresence custom={isDrawerOpen} exitBeforeEnter>
      <motion.div
        key={isDrawerOpen ? 'ham' : 'chat'}
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        exit={{ y: -200 }}
        style={{ margin: 0, position: 'absolute', left: '55px' }}
        transition={{ type: 'spring', bounce: 0.2, duration: 0.2 }}
      >
        <Box sx={{ position: 'relative' }}>
          {isDrawerOpen || isLargerScreen || chat == null ? (
            <Title order={isSmallScreen ? 3 : 2}>Ham's Chat</Title>
          ) : (
            <Group spacing={2}>
              {chat?.__typename === 'GroupChat' && chat.isAdmin && (
                <Group spacing={2}>
                  <ChatUpdateAction />
                  <Stack spacing={0}>
                    <Text p={0} size={'lg'}>
                      {chat.name}
                    </Text>
                    {chat.description && (
                      <Text color={'dimmed'} p={0} size={'xs'}>
                        {chat.description}
                      </Text>
                    )}
                  </Stack>
                </Group>
              )}
            </Group>
          )}
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedTitle;
