import { ActionIcon, Tooltip } from '@mantine/core';
import { IconCircleX } from '@tabler/icons';

type Props = {
  onRemove: () => void;
};

const RemoveNotificationAction = ({ onRemove }: Props) => (
  <Tooltip label="Remove" openDelay={200} withArrow withinPortal>
    <ActionIcon
      sx={{
        ':hover': {
          background: '#d2dbff',
        },
      }}
      onClick={onRemove}
    >
      <IconCircleX />
    </ActionIcon>
  </Tooltip>
);

export default RemoveNotificationAction;
