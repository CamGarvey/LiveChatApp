import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import React from 'react';
import { MoonStars, Sun } from 'tabler-icons-react';

type Props = {
  size?: number;
};

function ColorModeSwitcher({ size = 16 }: Props) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <ActionIcon variant={'default'} onClick={() => toggleColorScheme()}>
      {colorScheme === 'dark' ? <Sun size={size} /> : <MoonStars size={size} />}
    </ActionIcon>
  );
}

export default ColorModeSwitcher;
