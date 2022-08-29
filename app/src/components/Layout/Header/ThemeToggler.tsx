import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import React from 'react';
import { IconMoonStars, IconSun } from '@tabler/icons';

type Props = {
  size?: number;
};

function ColorModeSwitcher({ size = 16 }: Props) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <ActionIcon variant={'default'} onClick={() => toggleColorScheme()}>
      {colorScheme === 'dark' ? (
        <IconSun size={size} />
      ) : (
        <IconMoonStars size={size} />
      )}
    </ActionIcon>
  );
}

export default ColorModeSwitcher;
