import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { Box, Group, Stack, Text, Title } from '@mantine/core';
import { useDrawer } from 'store';
import { useMediaQuery } from '@mantine/hooks';
import ChatUpdateAction from 'components/shared/ChatUpdateAction';
import { gql } from '@apollo/client';
import { useEffect, useMemo } from 'react';
import { useGetChatForAnimatedTitleLazyQuery } from 'graphql/generated/graphql';
import { useParams } from 'react-router-dom';

gql`
  query GetChatForAnimatedTitle($chatId: HashId!) {
    chat(chatId: $chatId) {
      id
      ... on GroupChat {
        name
        description
        role
        ...ChatUpdateActionGroupChat
      }
      ... on DirectMessageChat {
        receipent {
          user {
            id
            name
            username
          }
        }
      }
    }
  }
  ${ChatUpdateAction.fragments.chat}
`;

const AnimatedTitle = () => {
  const { chatId } = useParams();
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

  const shouldShowTitle = useMemo(
    () =>
      drawer.isOpen ||
      isLargerScreen ||
      !chatId ||
      !chat ||
      chat.__typename === 'DeletedChat',
    [chat, chatId, drawer.isOpen, isLargerScreen]
  );

  const title = useMemo(() => {
    switch (chat?.__typename) {
      case 'GroupChat':
        return chat.name;
      case 'DeletedChat':
        return 'Deleted';
      case 'DirectMessageChat':
        return chat.receipent.user.username;
      default:
        return 'unknown';
    }
  }, [chat]);

  return (
    <AnimatePresence custom={drawer.isOpen} mode={'wait'}>
      <motion.div
        key={shouldShowTitle ? 'title' : 'chat'}
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        exit={{ y: -200 }}
        style={{ margin: 0, position: 'absolute', left: '55px' }}
        transition={{ type: 'spring', bounce: 0.2, duration: 0.2 }}
      >
        <Box sx={{ position: 'relative' }}>
          {shouldShowTitle ? (
            <Title order={isSmallScreen ? 3 : 2}>Ham's Chat</Title>
          ) : (
            <Group spacing={2}>
              <Group spacing={2}>
                {!!chat ? (
                  <>
                    {chat.__typename === 'GroupChat' && (
                      <ChatUpdateAction chat={chat} />
                    )}
                    <Stack spacing={0}>
                      <Text p={0} size={'lg'}>
                        {title}
                      </Text>
                      {chat.__typename === 'GroupChat' && chat.description && (
                        <Text color={'dimmed'} p={0} size={'xs'}>
                          {chat.description}
                        </Text>
                      )}
                      {chat.__typename === 'DirectMessageChat' &&
                        chat.receipent.user.name && (
                          <Text color={'dimmed'} p={0} size={'xs'}>
                            {chat.receipent.user.name}
                          </Text>
                        )}
                    </Stack>
                  </>
                ) : (
                  <>No chat</>
                )}
              </Group>
            </Group>
          )}
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedTitle;
