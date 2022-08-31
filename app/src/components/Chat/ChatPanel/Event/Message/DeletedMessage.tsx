import { Group, Text } from '@mantine/core';
import { IconGhost } from '@tabler/icons';

type Props = {
  iconSide: 'left' | 'right';
};

export const DeletedMessage = ({ iconSide }: Props) => {
  return (
    <Group
      spacing={'xs'}
      sx={{
        flexDirection: iconSide === 'right' ? 'row-reverse' : 'row',
      }}
    >
      <IconGhost color="grey" />
      <Text color={'dimmed'}>Deleted Message</Text>
    </Group>
  );
};
