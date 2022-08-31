import { Input } from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import { useUserSearchModal } from 'components/Modals/UserSearchModal';

const UserSearchBar = () => {
  const openUserSearchModal = useUserSearchModal();

  return (
    <Input
      icon={<IconSearch />}
      placeholder="Find your friends!"
      onClick={openUserSearchModal}
    />
  );
};

export default UserSearchBar;
