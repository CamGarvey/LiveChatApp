import { Menu } from '@mantine/core';
import { useUpdateGroupChatMutation } from '../../../graphql/generated/graphql';

type Props = {
  user: {
    id: string;
  };
  chat: {
    id: string;
  };
};

export const ChatMenu = ({ user, chat }: Props) => {
  const [removeMembers] = useUpdateGroupChatMutation({
    variables: {
      data: {
        chatId: chat.id,
        removeMemberIds: [user.id],
      },
    },
  });
  return (
    <Menu>
      <Menu.Item onClick={() => removeMembers()}>Remove from chat</Menu.Item>
    </Menu>
  );
};
