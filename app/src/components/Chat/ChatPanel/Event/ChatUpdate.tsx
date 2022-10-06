import { gql } from '@apollo/client';
import { Center, Text } from '@mantine/core';
import { ChatUpdateEventFragment } from 'graphql/generated/graphql';
import { useMemo } from 'react';

type Props = {
  update: ChatUpdateEventFragment;
};

const membersDesc = (members: { username: string }[]) => {
  const usernames = members.map((x) => x.username);
  if (usernames.length <= 2) return usernames.join(' and ');
  const remaining = usernames.length - 2;
  return (
    usernames.slice(0, 2).join(' and ') +
    ` and ${remaining} other${remaining > 1 ? 's' : ''}`
  );
};

export const ChatUpdate = ({ update }: Props) => {
  // const isSmallScreen = useMediaQuery('(max-width: 500px)');
  const message = useMemo(() => {
    switch (update.__typename) {
      case 'NameUpdated':
        return `${update.createdBy.username} named the group ${update.nameAfter}`;
      case 'DescriptionUpdated':
        return `${update.createdBy.username} set the group description ${update.descriptionAfter}`;
      case 'MembersAdded':
        return `${update.createdBy.username} added ${membersDesc(
          update.membersAdded
        )} to the group`;
      case 'MembersRemoved':
        return `${update.createdBy.username} removed ${membersDesc(
          update.membersRemoved
        )} from the group`;
    }
  }, [update]);
  return (
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
};

ChatUpdate.fragments = {
  event: gql`
    fragment ChatUpdateEvent on ChatUpdate {
      createdBy {
        id
        username
      }
      ... on NameUpdated {
        nameAfter
      }
      ... on DescriptionUpdated {
        descriptionAfter
      }
      ... on MembersAdded {
        membersAdded {
          id
          username
        }
      }
      ... on MembersRemoved {
        membersRemoved {
          id
          username
        }
      }
    }
  `,
};
