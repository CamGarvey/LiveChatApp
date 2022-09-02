import { gql } from '@apollo/client';
import { Loader } from '@mantine/core';
import { useGetChatAndFriendsForAdminSelectorQuery } from 'graphql/generated/graphql';
import _ from 'lodash';
import { useMemo } from 'react';
import UserMultiSelect from './UserSelector/UserMultiSelect';

gql`
  query GetChatAndFriendsForAdminSelector($chatId: HashId!) {
    chat(chatId: $chatId) {
      isCreator
      ... on GroupChat {
        admins {
          ...UserMultiSelect
        }
        members {
          ...UserMultiSelect
        }
      }
    }
    friends {
      ...UserMultiSelect
    }
  }
  ${(UserMultiSelect as any).fragments.user}
`;

type Props = {
  chatId: string;
  onChange: (data: {
    added: string[];
    removed: string[];
    selected: string[];
  }) => void;
};

export const AdminSelector = ({ chatId, onChange }: Props) => {
  const { loading, data } = useGetChatAndFriendsForAdminSelectorQuery({
    variables: {
      chatId,
    },
  });

  const chat = data?.chat;
  const friends = data?.friends;

  const adminIds = useMemo(() => {
    if (chat?.__typename === 'GroupChat') return chat.admins.map((x) => x.id);
    return [];
  }, [chat]);

  // Since other friends can add either friends
  // We need to make sure that we get all of the users in the chat
  // So that if the user takes a non friend out of the UserSelector
  // they can add them back in if it was a mistake
  const totalUsers = useMemo(() => {
    if (chat?.__typename === 'GroupChat') {
      if (friends) {
        return _.unionBy(
          chat.members,
          friends.map((x) => ({
            ...x,
          })),
          'id'
        );
      }
      return chat.members;
    }
    return [];
  }, [chat, friends]);

  const handleOnChange = (selected: string[]) => {
    const removed = adminIds.filter((x) => !selected.includes(x));
    const added = selected.filter((x) => !adminIds.includes(x));
    onChange({ added, removed, selected });
  };

  if (loading) return <Loader />;

  return (
    <UserMultiSelect
      label={'Admins'}
      users={totalUsers}
      defaultValue={chat?.__typename === 'GroupChat' ? chat.admins : []}
      onChange={handleOnChange}
      disabled={chat?.__typename !== 'GroupChat'}
      readOnly={chat?.__typename !== 'GroupChat' || !chat.isCreator}
    />
  );
};
