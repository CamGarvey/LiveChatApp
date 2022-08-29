import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { Box, Group, Stack, Text, Title } from '@mantine/core';
import { useChatId, useDrawer } from 'store';
import { useMediaQuery } from '@mantine/hooks';
import ChatUpdateAction from 'components/shared/ChatUpdateAction';
import { gql } from '@apollo/client';
import { useEffect } from 'react';
import { useGetChatForAnimatedTitleLazyQuery } from 'graphql/generated/graphql';

gql`
  query GetChatForAnimatedTitle($chatId: HashId!) {
    chat(chatId: $chatId) {
      ... on GroupChat {
        name
        description
        isAdmin
      }
      ... on DirectMessageChat {
        friend {
          username
        }
      }
    }
  }
`;

const AnimatedTitle = () => {
  const { chatId } = useChatId();
  const [getChat, { data }] = useGetChatForAnimatedTitleLazyQuery();

  const isLargerScreen = useMediaQuery('(min-width: 793px)');
  const isSmallScreen = useMediaQuery('(max-width: 500px)');
  const drawer = useDrawer();

  useEffect(() => {
    if (chatId) {
      getChat({
        variables: {
          chatId,
        },
      });
    }
  }, [getChat, chatId]);

  const chat = data?.chat;

  console.log({ chat });

  return (
    <AnimatePresence custom={drawer.isOpen} exitBeforeEnter>
      <motion.div
        key={drawer.isOpen ? 'ham' : 'chat'}
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        exit={{ y: -200 }}
        style={{ margin: 0, position: 'absolute', left: '55px' }}
        transition={{ type: 'spring', bounce: 0.2, duration: 0.2 }}
      >
        <Box sx={{ position: 'relative' }}>
          {drawer.isOpen || isLargerScreen || chat == null ? (
            <Title order={isSmallScreen ? 3 : 2}>Ham's Chat</Title>
          ) : (
            <Group spacing={2}>
              {chat?.__typename === 'GroupChat' && (
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
