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
import { motion } from 'framer-motion';

const MotionGroup = motion(Group);
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
      layout
      key={user.id}
      onClick={() => onClick?.()}
      variants={{
        opened: {
          width: '100%',
          borderRadius: `50px ${radius.md}px ${radius.md}px 50px`,
          transition: {
            duration: 0.2,
            type: 'tween',
            when: 'beforeChildren',
          },
        },
        closed: {
          width: `${sizes[avatarSize]}px`,
          borderRadius: '50px 50px 50px 50px',
          transition: {
            duration: 0.2,
            type: 'tween',
          },
        },
      }}
      sx={(theme) => ({
        display: 'flex',
        flexWrap: 'nowrap',
        gap: '20px',
        width: '100%',
        height: `${sizes[avatarSize]}px`,
        borderRadius: '50px 0px 0px 50px',
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        alignItems: 'center',
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
      })}
    >
      <UserAvatar size={avatarSize} user={user} />
      <MotionGroup
        layout
        key={user.id}
        sx={{
          flexWrap: 'nowrap',
          width: '100%',
        }}
        variants={{
          opened: {
            opacity: 1,
            display: 'flex',
            transition: {
              type: 'just',
            },
          },
          closed: {
            opacity: 0,
            display: 'none',
            transition: {
              type: 'just',
            },
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
