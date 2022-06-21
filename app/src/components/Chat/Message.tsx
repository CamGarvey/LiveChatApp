import { Group, Stack, Text, Paper, Avatar } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import moment from 'moment';
import { MessageItem } from '../../models';

type MessageProps = MessageItem & {
  onClick?: () => void;
  showInfo?: boolean;
  showAvatar?: boolean;
  variant?: 'default' | 'light';
};

const Message = ({
  content,
  createdBy,
  createdAt,
  onClick,
  showInfo = false,
  showAvatar = true,
  variant = 'default',
}: MessageProps) => {
  const largeScreen = useMediaQuery('(min-width: 1200px)');

  const time = moment(createdAt);
  let humanReadableTime = '';

  if (time.diff(moment()) < 10) {
    // humanReadableTime = time.fromNow();
  }

  return (
    <Group>
      <Avatar
        size="md"
        src={`https://avatars.dicebear.com/api/initials/${createdBy.username}.svg`}
        style={{ marginTop: 'auto' }}
        sx={{
          visibility: showAvatar ? 'visible' : 'hidden',
        }}
      />
      <Stack style={{ maxWidth: largeScreen ? '400px' : '200px', gap: '3px' }}>
        {showInfo && (
          <Group grow>
            <Text size={'sm'}>{createdBy.username}</Text>
            <Text size={'sm'} align={'right'}>
              {humanReadableTime}
            </Text>
          </Group>
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
              whiteSpace: 'pre',
            }}
          >
            {content}
          </Text>
        </Paper>
      </Stack>
    </Group>
  );
};
export default Message;
