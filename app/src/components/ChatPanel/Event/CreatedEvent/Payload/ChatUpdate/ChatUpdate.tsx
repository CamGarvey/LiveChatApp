import { gql } from '@apollo/client';
import { Center, Text } from '@mantine/core';

type Props = {
  message: string;
};

export const ChatUpdate = ({ message }: Props) => (
  <Center>
    <Text
      size={'xs'}
      align={'center'}
      sx={(theme) => ({
        color:
          theme.colorScheme === 'dark'
            ? theme.colors.gray[7]
            : theme.colors.gray[5],
      })}
    >
      {message}
    </Text>
  </Center>
);
