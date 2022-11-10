import { gql } from '@apollo/client';
import { Center, Text } from '@mantine/core';
import { ChatUpdateEventComponentFragment } from 'graphql/generated/graphql';
import { useMemo } from 'react';

type Props = {
  update: ChatUpdateEventComponentFragment;
};

const userDesc = (users: { username: string }[]) => {
  const usernames = users.map((x) => x.username);
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
        return `${update.createdBy.username} added ${userDesc(
          update.members.map((x) => x.user)
        )} to the group`;
      case 'MembersRemovedEvent':
        if (
          update.members.length === 1 &&
          update.members[0].user.id === update.createdBy.id
        ) {
          return `${update.createdBy.username} left the group`;
        }
        return `${update.createdBy.username} removed ${userDesc(
          update.members.map((x) => x.user)
        )} from the group`;
      case 'RoleChangedEvent':
        return `${update.createdBy.username} changed ${userDesc(
          update.members.map((x) => x.user)
        )} role to ${update.newRole}`;
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
        ...ChatUpdateMemberAlteration
      }
      ... on MembersRemovedEvent {
        ...ChatUpdateMemberAlteration
      }
      ... on RoleChangedEvent {
        newRole
        ...ChatUpdateMemberAlteration
      }
    }

    fragment ChatUpdateMemberAlteration on MemberAlterationEvent {
      members {
        user {
          id
          username
        }
      }
    }
  `,
};
