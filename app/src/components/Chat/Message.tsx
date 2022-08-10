import {
  Group,
  Stack,
  Text,
  Paper,
  Avatar,
  Loader,
  Tooltip,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { AnimatePresence, motion } from 'framer-motion';
import moment from 'moment';

type Msg = {
  content: string;
  createdBy: {
    username: string;
  };
  createdAt: string;
};

type MessageProps = Msg & {
  onClick?: () => void;
  hideAvatar?: boolean;
  variant?: 'default' | 'light';
  sending?: boolean;
  direction?: 'ltr' | 'rtl';
};

const MotionGroup = motion(Group);
const MotionStack = motion(Stack);

const Message = ({
  content,
  createdBy,
  createdAt,
  onClick,
  hideAvatar = false,
  variant = 'default',
  sending = false,
  direction = 'ltr',
}: MessageProps) => {
  const largeScreen = useMediaQuery('(min-width: 1200px)');
  return (
    <Group
      pb={3}
      sx={{
        direction,
      }}
    >
      <Avatar
        size="md"
        src={`https://avatars.dicebear.com/api/initials/${createdBy.username}.svg`}
        style={{ marginTop: 'auto' }}
        hidden={hideAvatar}
      />
      <MotionGroup
        transition={{ delay: 1 }}
        style={{ maxWidth: largeScreen ? '400px' : '200px', gap: '3px' }}
      >
        <Group spacing={1}>
          {sending && (
            <Tooltip label={'Sending...'} mt={'auto'}>
              <Loader size={8} />
            </Tooltip>
          )}
          <Paper
            shadow="sm"
            radius="lg"
            p="xs"
            py={'5px'}
            onClick={() => onClick && onClick()}
            sx={(theme) => ({
              backgroundColor:
                variant === 'light' &&
                (theme.colorScheme === 'dark'
                  ? theme.colors.blue[7]
                  : theme.colors.blue[1]),
              color:
                variant === 'light' && theme.colorScheme === 'dark' && '#fff',
            })}
            withBorder
          >
            <Text
              style={{
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word',
              }}
            >
              {content}
            </Text>
          </Paper>
        </Group>
        <AnimatePresence>
          <MotionStack
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            style={{ color: 'black', zIndex: -1 }}
          >
            <Text color={'dimmed'} size={'sm'}>
              {createdBy.username}
            </Text>
          </MotionStack>
        </AnimatePresence>
      </MotionGroup>
    </Group>
  );
};
export default Message;
