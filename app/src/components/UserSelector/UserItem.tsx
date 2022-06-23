import { Avatar, Group, Text } from '@mantine/core';
import { forwardRef } from 'react';
import UserProps from './UserProps';

const UserItem = forwardRef<HTMLDivElement, UserProps>(
  ({ image, username, name, ...others }: UserProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar size={'sm'} src={image} />
        <div>
          <Text>{username}</Text>
          <Text size="xs" color="dimmed">
            {name}
          </Text>
        </div>
      </Group>
    </div>
  )
);

export default UserItem;
