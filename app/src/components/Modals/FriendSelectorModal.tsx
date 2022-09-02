import { gql } from '@apollo/client';
import { ContextModalProps, useModals } from '@mantine/modals';
import UserList from 'components/shared/UserList';
import {
  useGetFriendsForSelectSearchModalQuery,
  UserListFragment,
} from 'graphql/generated/graphql';
import { useState } from 'react';

gql`
  query GetFriendsForSelectSearchModal {
    friends {
      ...UserList
    }
  }
  ${UserList.fragments.user}
`;

type Props = {
  onSelect: (user: UserListFragment) => void;
};

export const FriendSelectorModal = ({
  context,
  id,
  innerProps: { onSelect },
}: ContextModalProps<Props>) => {
  const { data, loading } = useGetFriendsForSelectSearchModalQuery();

  const [filter, setFilter] = useState('');

  const filteredUsers =
    data?.friends.filter(
      (x) => x.name?.includes(filter) || x.username.includes(filter)
    ) ?? [];

  return (
    <UserList
      users={filteredUsers}
      input={{
        placeholder: 'Start typing to find your friend',
      }}
      loading={loading}
      onUserClick={(user) => {
        onSelect(user);
        context.closeModal(id);
      }}
      showUserMenu={false}
      onInputChange={setFilter}
    />
  );
};

export const useFriendSelectorModal = () => {
  const modals = useModals();
  return (props: Props) =>
    modals.openContextModal('friendSelector', {
      withCloseButton: false,
      innerProps: props,
      padding: 'xs',
    });
};
