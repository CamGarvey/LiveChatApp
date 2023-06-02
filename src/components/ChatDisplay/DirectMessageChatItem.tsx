import { gql } from '@apollo/client';
import { NavLink } from '@mantine/core';
import { ChatAvatar } from 'components/shared/Avatars';
import { DirectMessageChatItemFragment } from 'graphql/generated/graphql';
import { Link, useLocation } from 'react-router-dom';
import { useDrawer } from 'store';

type Props = {
  chat: DirectMessageChatItemFragment;
};

const DirectMessageChatItem = ({ chat }: Props) => {
  const location = useLocation();
  const drawer = useDrawer();

  return (
    <NavLink
      component={Link}
      to={`/chats/${chat.id}`}
      style={{
        textDecoration: 'none',
      }}
      onClick={() => drawer.close()}
      active={location.pathname === `/chats/${chat.id}`}
      icon={<ChatAvatar chat={chat} />}
      label={chat.recipient.user.username}
    />
  );
};

DirectMessageChatItem.fragments = {
  chat: gql`
    fragment DirectMessageChatItem on DirectMessageChat {
      id
      recipient {
        user {
          ...ChatItemUser
        }
      }
    }

    fragment ChatItemUser on User {
      id
      username
    }
    ${ChatAvatar.fragments.chat}
  `,
};

export default DirectMessageChatItem;
