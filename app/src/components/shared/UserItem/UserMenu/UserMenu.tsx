import { gql } from '@apollo/client';
import { UserMenuFragment } from 'graphql/generated/graphql';
import FriendMenu from './FriendMenu';
import StrangerMenu from './StrangerMenu';
import { useMemo } from 'react';

type Props = {
  user: UserMenuFragment;
  target?: {
    icon?: React.ReactNode;
  };
  items?: React.ReactNode;
  loading?: boolean;
  iconSize?: number;
};

const UserMenu = ({ user, iconSize = 14, ...others }: Props) => {
  return useMemo(() => {
    switch (user.__typename) {
      case 'Me':
        return <></>;
      case 'Friend':
        return <FriendMenu friend={user} iconSize={iconSize} {...others} />;
      case 'Stranger':
        return <StrangerMenu stranger={user} iconSize={iconSize} {...others} />;
    }
  }, [user, iconSize, others]);
};

UserMenu.fragments = {
  user: gql`
    fragment UserMenu on User {
      ...FriendMenuFriend
      ...StrangerMenuStranger
    }
    ${FriendMenu.fragments.friend}
    ${StrangerMenu.fragments.stranger}
  `,
};

export default UserMenu;
