import { MantineTheme, useMantineTheme } from '@mantine/core';

const useDefaultColor = (shade?: MantineTheme['primaryShade']) => {
  const theme = useMantineTheme();
  return theme.colors[theme.primaryColor][
    shade ?? theme.primaryShade[theme.colorScheme]
  ];
};

export default useDefaultColor;
