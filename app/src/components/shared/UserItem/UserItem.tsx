import React, { useMemo } from 'react';
import {
  Box,
  Group,
  Stack,
  Sx,
  MantineNumberSize,
  useMantineTheme,
} from '@mantine/core';
import { UserAvatar } from 'components/shared/Avatars';
import { gql } from '@apollo/client';
import { UserItemFragment } from 'graphql/generated/graphql';
import TruncatedText from '../TruncatedText';
import { motion } from 'framer-motion';
import { AVATAR_SIZES } from 'utils';

const MotionGroup = motion(Group);
const MotionUserAvatar = motion(UserAvatar);

const SLIDE_DURATION = 0.6;
const AVATAR_DURATION = 0.7;

type Props = {
  user: UserItemFragment;
  menu?: React.ReactNode;
  avatar?: {
    size?: MantineNumberSize;
  };
  closed?: boolean;
  onClick?: () => void;
};
/**
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight fixed
 */
const UserItem = ({ user, menu, onClick, avatar }: Props) => {
  const { name, username } = user;
  const avatarSize = avatar?.size ?? 'md';
  const theme = useMantineTheme();

  const backgroundColor = useMemo(() => {
    const base = theme.colors.gray;
    return theme.colorScheme === 'dark' ? base[9] : base[0];
  }, [theme]);

  const textStyle: Sx = {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    cursor: 'default',
  };

  return (
    <MotionGroup
      key={user.id + '_user-item'}
      layout
      onClick={() => onClick?.()}
      spacing={'md'}
      sx={{
        flexWrap: 'nowrap',
        width: `calc(100% - ${AVATAR_SIZES[avatarSize] / 2}px)`,
        position: 'relative',
        height: `${AVATAR_SIZES[avatarSize]}px`,
        borderRadius: `50px ${theme.radius.md}px ${theme.radius.md}px 50px`,
      }}
      variants={{
        opened: {
          transition: {
            staggerChildren: AVATAR_DURATION,
          },
        },
        closed: {
          transition: {
            staggerChildren: SLIDE_DURATION,
            staggerDirection: -1,
          },
        },
      }}
    >
      <MotionUserAvatar
        size={avatarSize}
        user={user}
        sx={{
          backgroundColor,
          zIndex: 999,
        }}
        variants={{
          opened: {
            borderRadius: `50px ${theme.radius.md}px ${theme.radius.md}px 50px`,
            transition: {
              duration: AVATAR_DURATION,
            },
          },
          closed: {
            borderRadius: '50px 50px 50px 50px',
            transition: {
              duration: SLIDE_DURATION,
            },
          },
        }}
        hoverCard={{
          disabled: true,
        }}
      />
      <MotionGroup
        layout={'position'}
        key={user.id + '_user-item__content'}
        sx={{
          backgroundColor,
          borderRadius: `0px ${theme.radius.md}px ${theme.radius.md}px 0px`,
        }}
        pl={40}
        pr={'sm'}
        style={{
          originX: 0,
          position: 'absolute',
          left: `${AVATAR_SIZES[avatarSize] / 2}px`,
          height: `${AVATAR_SIZES[avatarSize]}px`,
          width: '100%',
          flexWrap: 'nowrap',
        }}
        variants={{
          opened: {
            scaleX: 1,
            transition: {
              when: 'beforeChildren',
              duration: SLIDE_DURATION,
            },
          },
          closed: {
            scaleX: 0,
            transition: {
              when: 'afterChildren',
              duration: SLIDE_DURATION,
            },
          },
        }}
      >
        <MotionGroup
          key={user.id + '_user-item__content_r'}
          sx={{ width: '100%', flexWrap: 'nowrap' }}
          variants={{
            opened: {
              opacity: 1,
            },
            closed: {
              opacity: 0,
            },
          }}
        >
          <Stack spacing={0}>
            <TruncatedText max={15} size={'sm'} sx={textStyle}>
              {`${username} ${user.__typename === 'Me' ? '(You)' : ''}`}
            </TruncatedText>
            <TruncatedText max={15} size={'xs'} color={'dimmed'} sx={textStyle}>
              {name}
            </TruncatedText>
          </Stack>
          {menu && user.__typename !== 'Me' && <Box ml={'auto'}>{menu}</Box>}
        </MotionGroup>
      </MotionGroup>
    </MotionGroup>
  );
};

UserItem.fragments = {
  user: gql`
    fragment UserItem on User {
      id
      username
      name
    }
  `,
};

export default UserItem;
