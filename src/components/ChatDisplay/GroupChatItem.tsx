import { gql } from '@apollo/client';
import { Avatar, NavLink } from '@mantine/core';
import { ChatAvatar, UserAvatar } from 'components/shared/Avatars';
import { ChatItemUserFragment, GroupChatItemFragment } from 'graphql/generated/graphql';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDrawer } from 'store';

type Props = {
  chat: GroupChatItemFragment;
};

const GroupChatItem = ({ chat }: Props) => {
  const location = useLocation();
  const drawer = useDrawer();

  const users = useMemo<ChatItemUserFragment[]>(
    () => chat.members.edges?.map((x) => x.node.user) ?? [],
    [chat]
  );

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
      label={chat.name}
      rightSection={
        <Avatar.Group ml={'auto'}>
          {users.map((user) => (
            <UserAvatar key={user.id} user={user} />
          ))}
          {chat.members.totalCount > 2 && (
            <Avatar radius={'xl'}>+{chat.members.totalCount - users.length}</Avatar>
          )}
        </Avatar.Group>
      }
    />
  );
};

GroupChatItem.fragments = {
  chat: gql`
    fragment GroupChatItem on GroupChat {
      id
      name
      description
      members(first: $firstMembers, after: $afterMember) {
        totalCount
        edges {
          node {
            user {
              ...ChatItemUser
            }
          }
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

export default GroupChatItem;
