import { Group, Avatar, Stack } from '@mantine/core';
import { useState } from 'react';
import MessageItem from '../../models/message-item';
import Message from './Message';

type MessageGroupProps = {
  messages: MessageItem[];
  showAvatar?: boolean;
};

// Message Group makes it so the avatar is only on the last message
const MessageGroup = ({ messages, showAvatar = true }: MessageGroupProps) => {
  const [showInfoFor, setShowInfoFor] = useState(null);
  const createdBy = messages[0].createdBy;
  return (
    <Group style={{}}>
      {showAvatar && (
        <Avatar
          size="md"
          src={`https://avatars.dicebear.com/api/initials/${createdBy.username}.svg`}
          style={{ marginTop: 'auto' }}
        />
      )}
      <Stack>
        {messages.map((message) => (
          <Message
            key={message.id}
            {...message}
            isInfoShown={showInfoFor === message.id}
            onClick={() => {
              if (showInfoFor === message.id) {
                setShowInfoFor(null);
              } else {
                setShowInfoFor(message.id);
              }
            }}
          />
        ))}
      </Stack>
    </Group>
  );
};

export default MessageGroup;
