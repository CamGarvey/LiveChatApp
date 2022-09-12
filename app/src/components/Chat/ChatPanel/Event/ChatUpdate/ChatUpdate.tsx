import { gql } from '@apollo/client';
import { Center, Group, Text } from '@mantine/core';
import { ChatUpdateEventFragment } from 'graphql/generated/graphql';

type Props = {
  update: ChatUpdateEventFragment;
};

export const ChatUpdate = ({ update }: Props) => {
  return (
    <Center>
      <Group>
        <Text color={'dimmed'}>
          {update.createdBy.username} updated the chat name
        </Text>
        <Text color={'dimmed'}>
          {update.__typename === 'NameUpdated' && update.nameAfter}
        </Text>
      </Group>
    </Center>
  );
};

ChatUpdate.fragments = {
  chatUpdate: gql`
    fragment ChatUpdateEvent on Event {
      ... on NameUpdated {
        nameBefore
        nameAfter
      }
      createdBy {
        id
        username
      }
    }
  `,
};
