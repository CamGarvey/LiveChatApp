import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';

type Props = {
  size?: number;
};

function ColorModeSwitcher({ size = 16 }: Props) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  return (
    <ActionIcon color={dark ? 'yellow' : 'blue'} onClick={() => toggleColorScheme()}>
      {dark ? <IconSun size={size} /> : <IconMoonStars size={size} />}
    </ActionIcon>
  );
}

export default ColorModeSwitcher;
