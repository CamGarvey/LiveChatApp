import { createStyles, MantineNumberSize } from '@mantine/core';
import { AVATAR_SIZES } from 'utils';

export interface UserItemStylesParams {
  size: MantineNumberSize;
}

export default createStyles((theme, { size }: UserItemStylesParams) => ({
  root: {
    flexWrap: 'nowrap',
    width: `calc(100% - ${AVATAR_SIZES[size] / 2}px)`,
    position: 'relative',
    height: `${AVATAR_SIZES[size]}px`,
    borderRadius: `${theme.radius.md}px`,
    gap: theme.spacing.md,
  },
  slide: {
    originX: 0,
    position: 'absolute',
    left: `${AVATAR_SIZES[size] / 2}px`,
    height: `${AVATAR_SIZES[size]}px`,
    width: '100%',
    flexWrap: 'nowrap',
    paddingLeft: '40px',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[9]
        : theme.colors.gray[0],
    borderRadius: `
        0px 
        ${theme.radius.md}px 
        ${theme.radius.md}px 
        0px`,
  },
  avatar: {
    zIndex: 99,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[9]
        : theme.colors.gray[0],
  },
  content: {
    display: 'flex',
    width: '100%',
    flexWrap: 'nowrap',
    alignItems: 'center',
    height: 'inherit',
    paddingRight: '4px',
  },
  username: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    cursor: 'default',
    fontSize: Math.min(theme.fontSizes[size], theme.fontSizes.lg),
    lineHeight: 1.2,
  },
}));
