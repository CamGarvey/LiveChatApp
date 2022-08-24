import { gql } from '@apollo/client';
import { Paper, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { MessageBubbleFragment } from 'graphql/generated/graphql';

type Props = {
  message: MessageBubbleFragment;
  onClick?: () => void;
  variant?: 'default' | 'light';
};

const MessageBubble = ({ message, onClick, variant = 'default' }: Props) => {
  const largeScreen = useMediaQuery('(min-width: 1200px)');
  return (
    <Paper
      shadow="sm"
      radius="lg"
      p="xs"
      py={'5px'}
      onClick={() => onClick && onClick()}
      sx={(theme) => ({
        maxWidth: largeScreen ? '380px' : '200px',
        backgroundColor:
          variant === 'light' &&
          (theme.colorScheme === 'dark'
            ? theme.colors.blue[7]
            : theme.colors.blue[1]),
        color: variant === 'light' && theme.colorScheme === 'dark' && '#fff',
      })}
      withBorder
    >
      <Text
        style={{
          whiteSpace: 'pre-wrap',
          overflowWrap: 'break-word',
        }}
      >
        {message.content}
      </Text>
    </Paper>
  );
};

MessageBubble.fragments = {
  message: gql`
    fragment MessageBubble on Message {
      content
    }
  `,
};

export default MessageBubble;
