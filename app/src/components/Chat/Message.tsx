import { Group, Stack, Text, Paper } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import moment from 'moment';
import MessageItem from '../../models/message-item';

type MessageProps = MessageItem & {
  onClick?: () => void;
  isInfoShown?: boolean;
};

const Message = ({
  content,
  createdBy,
  createdAt,
  onClick,
  isInfoShown = false,
}: MessageProps) => {
  const largeScreen = useMediaQuery('(min-width: 900px)');

  const time = moment(createdAt);
  let humanReadableTime = '';

  if (time.diff(moment()) < 10) {
    humanReadableTime = time.fromNow();
  }

  return (
    <Stack style={{ width: largeScreen ? '400px' : '200px', gap: '3px' }}>
      {isInfoShown && (
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
        p="md"
        // onClick={() => onClick && onClick()}
        onClick={() => console.log(time.minutes())}
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
  );
};
export default Message;
