import { Paper, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

type Props = {
  content: string;
  onClick?: () => void;
  variant?: 'default' | 'light';
};

const MessageBubble = ({ content, onClick, variant = 'default' }: Props) => {
  const largeScreen = useMediaQuery('(min-width: 1200px)');
  return (
    <Paper
      shadow="sm"
      radius="lg"
      p="xs"
      py={'5px'}
      onClick={() => onClick && onClick()}
      sx={(theme) => ({
        overflow: 'hidden',
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
        {content}
      </Text>
    </Paper>
  );
};

export default MessageBubble;
