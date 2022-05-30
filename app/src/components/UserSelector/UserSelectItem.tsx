import {
  Avatar,
  Checkbox,
  Container,
  Group,
  SimpleGrid,
  Text,
  Stack,
  UnstyledButton,
} from '@mantine/core';
import { User } from '../../graphql/generated/graphql';

type Props = {
  username: string;
  name?: string;
  selected: boolean;
  onClick: () => void;
};

const UserItem = ({ username, name, selected, onClick }: Props) => {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
      onClick={onClick}
    >
      <Group>
        <Avatar
          size="sm"
          src={`https://avatars.dicebear.com/api/initials/${name}.svg`}
        />
        <Text size="sm">{name}</Text>
        <Checkbox ml={'auto'} checked={selected} />
      </Group>
    </UnstyledButton>
  );
};

export default UserItem;
