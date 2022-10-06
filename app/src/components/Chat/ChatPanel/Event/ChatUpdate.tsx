import { gql } from '@apollo/client';
import { Center, Text } from '@mantine/core';
import { ChatUpdateEventComponentFragment } from 'graphql/generated/graphql';
import { useMemo } from 'react';

type Props = {
  update: ChatUpdateEventComponentFragment;
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
      case 'NameUpdatedEvent':
        return `${update.createdBy.username} named the group ${update.nameAfter}`;
      case 'DescriptionUpdatedEvent':
        return `${update.createdBy.username} set the group description ${update.descriptionAfter}`;
      case 'MembersAddedEvent':
        return `${update.createdBy.username} added ${membersDesc(
          update.users
        )} to the group`;
      case 'MembersRemovedEvent':
        return `${update.createdBy.username} removed ${membersDesc(
          update.users
        )} from the group`;
      case 'AdminsAddedEvent':
        return `${update.createdBy.username} added ${membersDesc(
          update.users
        )} as group admin`;
      case 'AdminsRemovedEvent':
        return `${update.createdBy.username} removed ${membersDesc(
          update.users
        )} as group admin`;
      default:
        return 'WHOOPS';
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
    fragment ChatUpdateEventComponent on ChatUpdateEvent {
      createdBy {
        id
        username
      }
      ... on NameUpdatedEvent {
        nameAfter
      }
      ... on DescriptionUpdatedEvent {
        descriptionAfter
      }
      ... on MembersAddedEvent {
        ...ChatUpdateUserAlteration
      }
      ... on MembersRemovedEvent {
        ...ChatUpdateUserAlteration
      }
      ... on AdminsAddedEvent {
        ...ChatUpdateUserAlteration
      }
      ... on AdminsRemovedEvent {
        ...ChatUpdateUserAlteration
      }
    }

    fragment ChatUpdateUserAlteration on UserAlterationEvent {
      users {
        id
        username
      }
    }
  `,
};
