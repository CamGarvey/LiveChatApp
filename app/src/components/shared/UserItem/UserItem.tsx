import React, { useState } from 'react';
import { Box, Group, Stack, Sx } from '@mantine/core';
import { UserAvatar } from 'components/shared/Avatars';
import { gql } from '@apollo/client';
import { UserItemFragment } from 'graphql/generated/graphql';
import TruncatedText from '../TruncatedText';
import { AnimatePresence, motion } from 'framer-motion';

const MotionGroup = motion(Group);

type Props = {
  user: UserItemFragment;
  menu?: React.ReactNode;
  onClick?: () => void;
};

const UserItem = ({ user, menu, onClick }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { name, username } = user;

  const textStyle: Sx = {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    cursor: 'default',
  };

  return (
    <MotionGroup
      p={'xs'}
      animate={isOpen ? 'open' : 'closed'}
      variants={{
        open: {
          borderRadius: '10px',
        },
        closed: {
          borderRadius: '50%',
        },
      }}
      onClick={() => {
        setIsOpen((prev) => !prev);
        onClick?.();
      }}
      sx={(theme) => ({
        display: 'flex',
        width: 'fit-content',
        flexWrap: 'nowrap',
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
      <AnimatePresence>
        {isOpen ? (
          <UserAvatar size="sm" user={user} />
        ) : (
          <UserAvatar size="md" user={user} />
        )}
      </AnimatePresence>
      <MotionGroup
        sx={{
          width: '100%',
          flexWrap: 'nowrap',
        }}
        animate={isOpen ? 'open' : 'closed'}
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
