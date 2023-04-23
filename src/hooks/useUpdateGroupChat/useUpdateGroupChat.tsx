import { useDeleteChat } from 'hooks/useDeleteChat';
import { useChatDescription } from './useChatDescription';
import { useChatMembers } from './useChatMembers';
import { useChatName } from './useChatName';

export const useUpdateGroupChat = () => {
  const del = useDeleteChat();
  const name = useChatName();
  const description = useChatDescription();
  const members = useChatMembers();

  return {
    name: name.update,
    description: description.update,
    members,
    delete: del.deleteChat,
    loading: name.loading || description.loading || members.loading || del.loading,
  };
};
