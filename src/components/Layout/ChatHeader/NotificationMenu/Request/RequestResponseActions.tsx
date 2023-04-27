import { ActionIcon, Group, Tooltip } from '@mantine/core';
import { IconCircleCheck, IconCircleX } from '@tabler/icons';

type Props = {
  onAccept: () => void;
  onDecline: () => void;
};

const RequestResponseActions = ({ onAccept, onDecline }: Props) => (
  <Group ml={'auto'} pr={'3px'}>
    <Tooltip label="Decline" openDelay={200} withArrow withinPortal>
      <ActionIcon
        sx={{
          ':hover': {
            background: '#d2dbff',
          },
        }}
        onClick={onDecline}
      >
        <IconCircleX />
      </ActionIcon>
    </Tooltip>
    <Tooltip label="Accept" openDelay={200} withArrow withinPortal>
      <ActionIcon
        sx={{
          ':hover': {
            background: '#d2dbff',
          },
        }}
        onClick={onAccept}
      >
        <IconCircleCheck />
      </ActionIcon>
    </Tooltip>
  </Group>
);

export default RequestResponseActions;
