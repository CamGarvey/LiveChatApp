import { gql } from '@apollo/client';
import { ActionIcon, Menu, Tooltip } from '@mantine/core';
import { useFriend } from 'hooks';
import { IconUserCircle, IconUserMinus } from '@tabler/icons';
import { FriendMenuFriendFragment } from 'graphql/generated/graphql';
import useDefaultColor from 'hooks/useDefaultColor';

type Props = {
  friend: FriendMenuFriendFragment;
  target?: {
    icon?: React.ReactNode;
  };
  items?: React.ReactNode;
  loading?: boolean;
  iconSize?: number;
};

const FriendMenu = ({
  friend,
  iconSize = 14,
  target,
  items,
  loading = false,
}: Props) => {
  const { deleteFriend, loading: loadingMutation } = useFriend(friend);
  const defaultColor = useDefaultColor();

  return (
    <Menu width={'max-content'}>
      <Menu.Target>
        <Tooltip hidden={!!friend} label={!friend && 'Failed to load user'}>
          <ActionIcon
            loaderProps={{
              color: defaultColor,
            }}
            loading={loadingMutation || loading}
          >
            {target?.icon ? <>{target.icon}</> : <IconUserCircle />}
          </ActionIcon>
        </Tooltip>
      </Menu.Target>
      {friend && (
        <Menu.Dropdown>
          <Menu.Item
            color={'red'}
            icon={<IconUserMinus size={iconSize} />}
            onClick={() => deleteFriend()}
          >
            UnFriend
          </Menu.Item>
          {items && (
            <>
              <Menu.Divider />
              {items}
            </>
          )}
        </Menu.Dropdown>
      )}
    </Menu>
  );
};

FriendMenu.fragments = {
  friend: gql`
    fragment FriendMenuFriend on Friend {
      id
    }
  `,
};

export default FriendMenu;
