import React, { useState } from 'react';
import { Box, Group, Stack, Sx } from '@mantine/core';
import { UserAvatar } from 'components/shared/Avatars';
import { gql } from '@apollo/client';
import { UserItemFragment } from 'graphql/generated/graphql';
import TruncatedText from '../TruncatedText';
import { motion } from 'framer-motion';

const MotionGroup = motion(Group);

type Props = {
  user: UserItemFragment;
  menu?: React.ReactNode;
  closed?: boolean;
  onClick?: () => void;
};

/**
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight fixed
 */
const UserItem = ({ user, menu, onClick, closed = false }: Props) => {
  const { name, username } = user;

  const textStyle: Sx = {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    cursor: 'default',
  };

  return (
    <MotionGroup
      animate={closed ? 'closed' : 'open'}
      variants={{
        open: {
          borderRadius: '10px',
          padding: '1px',
        },
        closed: {
          borderRadius: '50%',
          padding: '0px',
        },
      }}
      onClick={() => onClick?.()}
      sx={(theme) => ({
        display: 'flex',
        flexWrap: 'nowrap',
        width: closed ? 'fit-content' : '100%',
        flexGrow: closed ? 0 : 1,
        gap: '20px',
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        alignItems: 'center',
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
      })}
    >
      <UserAvatar size={'sm'} user={user} />
      <MotionGroup
        sx={{
          flexWrap: 'nowrap',
          flexGrow: 1,
        }}
        animate={closed ? 'closed' : 'open'}
        variants={{
          open: {
            opacity: 1,
            x: 0,
          },
          closed: {
            opacity: 0,
            x: -100,
            display: 'none',
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
