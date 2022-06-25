import { Menu } from '@mantine/core';

type Props = {
  onRemoveMemberClick?: () => void;
};

export const ChannelMenu = ({ onRemoveMemberClick }: Props) => {
  return (
    <Menu>
      <Menu.Item onClick={onRemoveMemberClick}>Remove from channel</Menu.Item>
    </Menu>
  );
};
