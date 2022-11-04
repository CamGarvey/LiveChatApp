import React from 'react';
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
import { LayoutGroup, motion } from 'framer-motion';

const MotionGroup = motion(Group);
const MotionUserAvatar = motion(UserAvatar);

const sizes = {
  xs: 16,
  sm: 26,
  md: 38,
  lg: 56,
  xl: 84,
};

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
  const { radius } = useMantineTheme();

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
      sx={(theme) => ({
        flexWrap: 'nowrap',
        width: `calc(100% - ${sizes[avatarSize] / 2}px)`,
        position: 'relative',
        height: `${sizes[avatarSize]}px`,
        borderRadius: `50px ${radius.md}px ${radius.md}px 50px`,
      })}
      variants={{
        opened: {
          transition: {
            staggerChildren: 0.2,
          },
        },
        closed: {
          transition: {
            staggerChildren: 0.8,
            staggerDirection: -1,
          },
        },
      }}
    >
      <MotionUserAvatar
        size={avatarSize}
        user={user}
        style={{
          backgroundColor: '#2d2c2c',
          zIndex: 999,
        }}
        variants={{
          opened: {
            borderRadius: `50px ${radius.md}px ${radius.md}px 50px`,
            transition: {
              duration: 0.2,
            },
          },
          closed: {
            borderRadius: '50px 50px 50px 50px',
            transition: {
              duration: 0.8,
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
        sx={(theme) => ({
          borderRadius: `0px ${theme.radius.md}px ${theme.radius.md}px 0px`,
        })}
        pl={40}
        pr={'sm'}
        style={{
          originX: 0,
          position: 'absolute',
          left: `${sizes[avatarSize] / 2}px`,
          height: `${sizes[avatarSize]}px`,
          width: '100%',
          backgroundColor: '#2d2c2c',
          flexWrap: 'nowrap',
        }}
        variants={{
          opened: {
            scaleX: 1,
            transition: {
              // type: 'just',
              when: 'beforeChildren',
              duration: 0.8,
            },
          },
          closed: {
            scaleX: 0,
            transition: {
              // type: 'just',
              when: 'afterChildren',
              duration: 0.8,
            },
          },
        }}
      >
        <MotionGroup
          layout={'position'}
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
