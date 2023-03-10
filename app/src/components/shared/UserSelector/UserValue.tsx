import { Avatar, Box, CloseButton, MultiSelectValueProps } from '@mantine/core';

const UserValue = ({
  image,
  value,
  label,
  onRemove,
  canRemove = true,
  classNames,
  ...others
}: MultiSelectValueProps & {
  value: string;
  image: string;
  canRemove: boolean;
}) => {
  return (
    <div key={value} {...others}>
      <Box
        sx={(theme) => ({
          display: 'flex',
          cursor: 'default',
          alignItems: 'center',
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
          border: `1px solid ${
            theme.colorScheme === 'dark'
              ? theme.colors.dark[7]
              : theme.colors.gray[4]
          }`,
          paddingLeft: 10,
          borderRadius: 4,
        })}
      >
        <Box mr={10}>
          <Avatar size={'xs'} src={image} />
        </Box>
        <Box sx={{ lineHeight: 1, fontSize: 12 }}>{label}</Box>
        <CloseButton
          onMouseDown={onRemove}
          disabled={!canRemove}
          variant="transparent"
          size={22}
          iconSize={14}
          tabIndex={-1}
        />
      </Box>
    </div>
  );
};

export default UserValue;
