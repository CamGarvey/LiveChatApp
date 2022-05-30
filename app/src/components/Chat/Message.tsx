import { Group, Stack, Text, Paper } from '@mantine/core';
import moment from 'moment';
import React from 'react';
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
  return (
    <Stack style={{ width: '400px', gap: '3px' }}>
      {isInfoShown && (
        <Group grow>
          <Text size={'sm'}>{createdBy.username}</Text>
          <Text size={'sm'} align={'right'}>
            {moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}
          </Text>
        </Group>
      )}
      <Paper
        shadow="sm"
        radius="lg"
        p="md"
        onClick={() => onClick && onClick()}
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
