import { gql } from '@apollo/client';
import {
  ChatMembersAddedUpdateComponentFragment,
  ChatMembersRemovedUpdateComponentFragment,
  ChatNameUpdateComponentFragment,
} from 'graphql/generated/graphql';
import { useMemo } from 'react';
import { ChatUpdate } from './ChatUpdate';
import { userDesc } from './user-desc';

type Props = {
  update: ChatMembersRemovedUpdateComponentFragment;
};

const ChatMembersRemovedUpdate = ({ update }: Props) => {
  const message = useMemo(() => {
    const createdBy = update.event.createdBy;
    if (
      update.members.length === 1 &&
      update.members[0].user.id === createdBy
    ) {
      return `${createdBy.username} left the group`;
    }
    return `${createdBy.username} removed ${userDesc(
      update.members.map((x) => x.user)
    )} from the group`;
  }, [update]);
  return <ChatUpdate message={message} />;
};

ChatMembersRemovedUpdate.fragments = {
  update: gql`
    fragment ChatMembersRemovedUpdateComponent on ChatMembersRemovedUpdate {
      event {
        createdBy {
          id
          username
        }
      }
      members {
        user {
          id
          username
        }
      }
    }
  `,
};

export default ChatMembersRemovedUpdate;
