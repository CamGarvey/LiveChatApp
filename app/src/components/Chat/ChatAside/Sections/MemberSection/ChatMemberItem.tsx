import { gql } from '@apollo/client';
import { MantineNumberSize, Menu } from '@mantine/core';
import { IconDots, IconKarate } from '@tabler/icons';
import UserItem from 'components/shared/UserItem';
import UserMenu from 'components/shared/UserItem/UserMenu';
import {
  ChatMemberItemChatFragment,
  ChatMemberItemUserFragment,
} from 'graphql/generated/graphql';
import { useUpdateChat } from 'hooks';

type Props = {
  chat: ChatMemberItemChatFragment;
  user: ChatMemberItemUserFragment;
  avatar?: {
    size?: MantineNumberSize | undefined;
  };
};

const ChatMemberItem = ({ chat, user, avatar }: Props) => {
  const { update, loading: loadingRemove } = useUpdateChat();

  return (
    <UserItem
      key={user.id}
      user={user}
      avatar={avatar}
      menu={
        <UserMenu
          loading={loadingRemove}
          target={{
            icon: <IconDots />,
          }}
          items={
            chat.__typename === 'GroupChat' &&
            chat.isAdmin && (
              <Menu.Item
                onClick={() => {
                  update(chat.id, {
                    removeMembers: [user.id],
                  });
                }}
                color={'red'}
                icon={<IconKarate size={14} />}
              >
                Remove from group
              </Menu.Item>
            )
          }
          user={user}
        />
      }
    />
  );
};

ChatMemberItem.fragments = {
  chat: gql`
    fragment ChatMemberItemChat on Chat {
      id
      ... on GroupChat {
        isAdmin
      }
    }
  `,
  user: gql`
    fragment ChatMemberItemUser on User {
      ...UserItem
      ...UserMenu
    }
    ${UserItem.fragments.user}
    ${UserMenu.fragments.user}
  `,
};

export default ChatMemberItem;
