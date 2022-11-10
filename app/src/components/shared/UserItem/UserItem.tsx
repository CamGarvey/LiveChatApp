import React from 'react';
import {
  Box,
  Group,
  useMantineTheme,
  MantineNumberSize,
  Selectors,
  DefaultProps,
} from '@mantine/core';
import { UserAvatar } from 'components/shared/Avatars';
import { gql } from '@apollo/client';
import { UserItemFragment } from 'graphql/generated/graphql';
import TruncatedText from '../TruncatedText';
import { motion } from 'framer-motion';
import useStyles, { UserItemStylesParams } from './UserItem.styles';

const AnimationDurations = {
  CloseSlide: 0.6,
  OpenSlide: 0.6,
  OpenAvatar: 0.4,
  CloseAvatar: 1,
};

const MotionGroup = motion(Group);
const MotionUserAvatar = motion(UserAvatar);

type UserItemStylesNames = Selectors<typeof useStyles>;

interface Props
  extends DefaultProps<UserItemStylesNames, UserItemStylesParams> {
  user: UserItemFragment;
  menu?: React.ReactNode;
  size?: MantineNumberSize | undefined;
  closed?: boolean;
  onClick?: () => void;
}

const UserItem = ({
  classNames,
  styles,
  unstyled,
  className,
  user,
  menu,
  onClick,
  size = 'md',
  ...others
}: Props) => {
  const { classes, cx } = useStyles(
    { size },
    { name: 'UserItem', classNames, styles, unstyled }
  );

  const theme = useMantineTheme();
  const openedAvatarRadius = theme.radius.sm;

  return (
    <MotionGroup
      key={`${user.id}-user-item`}
      layout
      onClick={() => onClick?.()}
      className={cx(classes.root, className)}
      variants={{
        opened: {
          transition: {
            staggerChildren: AnimationDurations.OpenAvatar,
          },
        },
        closed: {
          transition: {
            staggerChildren: AnimationDurations.CloseSlide,
            staggerDirection: -1,
          },
        },
      }}
      {...others}
    >
      <MotionUserAvatar
        size={size}
        user={user}
        className={cx(classes.avatar, className)}
        radius={openedAvatarRadius}
        variants={{
          opened: {
            borderRadius: `
              ${openedAvatarRadius}px 
              ${openedAvatarRadius}px 
              ${openedAvatarRadius}px 
              ${openedAvatarRadius}px`,
            transition: {
              duration: AnimationDurations.OpenAvatar,
            },
          },
          closed: {
            borderRadius: '50px 50px 50px 50px',
            transition: {
              duration: AnimationDurations.CloseAvatar,
            },
          },
        }}
        hoverCard={{
          disabled: true,
        }}
      />
      <motion.div
        layout={'position'}
        key={`${user.id}-user-item__slide`}
        className={classes.slide}
        style={{
          originX: 0,
        }}
        variants={{
          opened: {
            scaleX: 1,
            transition: {
              when: 'beforeChildren',
              duration: AnimationDurations.OpenSlide,
            },
          },
          closed: {
            scaleX: 0,
            transition: {
              when: 'afterChildren',
              duration: AnimationDurations.CloseSlide,
            },
          },
        }}
      >
        <motion.div
          key={user.id + '_user-item__content'}
          className={classes.content}
          variants={{
            opened: {
              opacity: 1,
            },
            closed: {
              opacity: 0,
            },
          }}
        >
          <TruncatedText max={17} className={cx(classes.username)}>
            {user.__typename === 'Me' ? 'YOU' : user.username}
          </TruncatedText>
          {menu && user.__typename !== 'Me' && <Box ml={'auto'}>{menu}</Box>}
        </motion.div>
      </motion.div>
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
