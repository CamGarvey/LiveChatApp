import { Avatar, Group, Text } from '@mantine/core';
import { forwardRef } from 'react';
import UserProps from './UserProps';

const UserSelectItem = forwardRef<HTMLDivElement, UserProps>(
  ({ image, id, username, name, ...others }: UserProps, ref) => (
    <div key={id} ref={ref} {...others}>
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

export default UserSelectItem;
