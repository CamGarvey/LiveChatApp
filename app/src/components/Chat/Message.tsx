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
  isSelected?: boolean;
  showAvatar?: boolean;
  variant?: 'default' | 'light';
  sending?: boolean;
};

const MotionGroup = motion(Group);
const MotionStack = motion(Stack);

const Message = ({
  content,
  createdBy,
  createdAt,
  onClick,
  isSelected = false,
  showAvatar = true,
  variant = 'default',
  sending = false,
}: MessageProps) => {
  const largeScreen = useMediaQuery('(min-width: 1200px)');

  const time = moment(createdAt);
  let humanReadableTime = '';

  if (time.diff(moment()) < 10) {
    // humanReadableTime = time.fromNow();
  }

  return (
    <Group pb={3}>
      <Avatar
        size="md"
        src={`https://avatars.dicebear.com/api/initials/${createdBy.username}.svg`}
        style={{ marginTop: 'auto' }}
        sx={{
          visibility: showAvatar ? 'visible' : 'hidden',
        }}
      />
      <MotionStack
        transition={{ delay: 1 }}
        style={{ maxWidth: largeScreen ? '400px' : '200px', gap: '3px' }}
      >
        <AnimatePresence>
          {isSelected && (
            <MotionGroup
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              style={{ color: 'black', zIndex: -1 }}
              grow
            >
              <Text size={'sm'}>{createdBy.username}</Text>
              <Text size={'sm'} align={'right'}>
                {humanReadableTime}
              </Text>
            </MotionGroup>
          )}
        </AnimatePresence>
        <Group spacing={1}>
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
          {sending && (
            <Tooltip label={'Sending...'} mt={'auto'}>
              <Loader size={8} />
            </Tooltip>
          )}
        </Group>
      </MotionStack>
    </Group>
  );
};
export default Message;
