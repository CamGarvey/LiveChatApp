import { gql } from '@apollo/client';
import { ChatNameUpdateComponentFragment } from 'graphql/generated/graphql';
import { useMemo } from 'react';
import { ChatUpdate } from './ChatUpdate';

type Props = {
  update: ChatNameUpdateComponentFragment;
};

const ChatNameUpdate = ({ update }: Props) => {
  const message = useMemo(
    () => `${update.event.createdBy.username} named the group ${update.nameAfter}`,
    [update]
  );
  return <ChatUpdate message={message} />;
};

ChatNameUpdate.fragments = {
  update: gql`
    fragment ChatNameUpdateComponent on ChatNameUpdate {
      event {
        createdBy {
          id
          username
        }
      }
      nameAfter
    }
  `,
};

export default ChatNameUpdate;
