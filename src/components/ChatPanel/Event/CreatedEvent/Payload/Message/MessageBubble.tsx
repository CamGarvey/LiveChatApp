import { gql } from '@apollo/client';
import { Paper, PaperProps, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { MessageBubbleFragment } from 'graphql/generated/graphql';
import useDefaultColor from 'hooks/useDefaultColor';

type Props = {
  message: MessageBubbleFragment;
  onClick?: () => void;
  variant?: 'default' | 'light';
} & PaperProps;

const MessageBubble = ({ message, onClick, variant = 'default', ...other }: Props) => {
  const smallScreen = useMediaQuery('(max-width: 470px)');
  const largeScreen = useMediaQuery('(min-width: 1200px)');
  const defaultColor = useDefaultColor();

  return (
    <Paper
      shadow="sm"
      radius="lg"
      p="xs"
      py={'5px'}
      onClick={() => onClick && onClick()}
      sx={(theme) => ({
        maxWidth: largeScreen ? '380px' : smallScreen ? '170px' : '250px',
        backgroundColor: variant === 'light' ? defaultColor : undefined,
        color: variant === 'light' ? '#fff' : undefined,
      })}
      withBorder={variant === 'default'}
      {...other}
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
      event {
        id
      }
      content
    }
  `,
};

export default MessageBubble;
