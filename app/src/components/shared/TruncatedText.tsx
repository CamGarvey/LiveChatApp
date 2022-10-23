import { Text, TextProps } from '@mantine/core';
import { useMemo } from 'react';

type Props = {
  children?: string | null | undefined;
  max: number;
  ellipse?: boolean;
} & Omit<TextProps, 'children'>;

const TruncatedText = ({ max, children, ellipse = true, ...others }: Props) => {
  const string = useMemo(() => {
    if (!children) return '';
    if (children.length <= max) return children;
    return children.substring(0, max).padEnd(ellipse ? max + 3 : 0, '.');
  }, [children, max, ellipse]);

  return <Text {...others}>{string}</Text>;
};

export default TruncatedText;
