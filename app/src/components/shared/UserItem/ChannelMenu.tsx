import { Menu } from '@mantine/core';
import { useRemoveMembersFromChannelMutation } from '../../../graphql/generated/graphql';

type Props = {
  user: {
    id: string;
  };
  channel: {
    id: string;
  };
};

export const ChannelMenu = ({ user, channel }: Props) => {
  const [removeMembers] = useRemoveMembersFromChannelMutation({
    variables: {
      channelId: channel.id,
      membersIds: [user.id],
    },
  });
  return (
    <Menu>
      <Menu.Item onClick={() => removeMembers()}>Remove from channel</Menu.Item>
    </Menu>
  );
};
