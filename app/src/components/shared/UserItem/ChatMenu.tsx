import { Menu } from '@mantine/core';
import { useRemoveMembersFromChatMutation } from '../../../graphql/generated/graphql';

type Props = {
  user: {
    id: string;
  };
  chat: {
    id: string;
  };
};

export const ChatMenu = ({ user, chat }: Props) => {
  const [removeMembers] = useRemoveMembersFromChatMutation({
    variables: {
      chatId: chat.id,
      membersIds: [user.id],
    },
  });
  return (
    <Menu>
      <Menu.Item onClick={() => removeMembers()}>Remove from chat</Menu.Item>
    </Menu>
  );
};
