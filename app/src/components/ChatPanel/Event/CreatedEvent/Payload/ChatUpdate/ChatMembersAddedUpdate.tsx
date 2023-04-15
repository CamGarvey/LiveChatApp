import { gql } from '@apollo/client';
import { ChatMembersAddedUpdateComponentFragment } from 'graphql/generated/graphql';
import { useMemo } from 'react';
import { ChatUpdate } from './ChatUpdate';
import { userDesc } from './user-desc';

type Props = {
  update: ChatMembersAddedUpdateComponentFragment;
};

const ChatMembersAddedUpdate = ({ update }: Props) => {
  const message = useMemo(
    () =>
      `${update.event.createdBy.username} added ${userDesc(
        update.members.map((x) => x.user)
      )} to the group`,
    [update]
  );
  return <ChatUpdate message={message} />;
};

ChatMembersAddedUpdate.fragments = {
  event: gql`
    fragment ChatMembersAddedUpdateEvent on CreatedEvent {
      createdBy {
        id
        username
      }
    }
  `,
  update: gql`
    fragment ChatMembersAddedUpdateComponent on ChatMembersAddedUpdate {
      event {

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

export default ChatMembersAddedUpdate;
