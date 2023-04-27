import { Grid, Stack, Text, TextProps } from '@mantine/core';
import { UserAvatar } from 'components/shared/Avatars';
import { UserAvatarFragment } from 'graphql/generated/graphql';
import moment from 'moment';
import React, { useMemo } from 'react';

type Props = {
  user: UserAvatarFragment;
  createdAt: any;
  children: React.ReactNode;
  actions?: React.ReactNode;
  textProps?: TextProps;
};

const Notification = ({ user, createdAt, children, actions, textProps }: Props) => {
  const createdAtRelative = useMemo(() => moment(createdAt).fromNow(), [createdAt]);

  return (
    <Grid align="center">
      <Grid.Col span="content">
        <UserAvatar size="sm" user={user} ml={20} />
      </Grid.Col>
      <Grid.Col span="auto">
        <Stack spacing={4}>
          {children}
          <Text size={'xs'} color={'blue'} {...textProps}>
            {createdAtRelative}
          </Text>
        </Stack>
      </Grid.Col>
      <Grid.Col span="content">{actions}</Grid.Col>
    </Grid>
  );
};

export default Notification;
