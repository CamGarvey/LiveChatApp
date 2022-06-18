import { Avatar, Checkbox, Group, Text, UnstyledButton } from '@mantine/core';

type Props = {
  username: string;
  name?: string;
  selected: boolean;
  onClick: () => void;
};

const UserItem = ({ name, selected, onClick }: Props) => {
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
        <Avatar size="sm">{name}</Avatar>
        <Text size="sm">{name}</Text>
        <Checkbox ml={'auto'} checked={selected} />
      </Group>
    </UnstyledButton>
  );
};

export default UserItem;
