import { gql } from '@apollo/client';
import {
  ChatDescriptionUpdateComponentFragment,
  ChatNameUpdateComponentFragment,
} from 'graphql/generated/graphql';
import { useMemo } from 'react';
import { ChatUpdate } from './ChatUpdate';

type Props = {
  update: ChatDescriptionUpdateComponentFragment;
};

const ChatDescriptionUpdate = ({ update }: Props) => {
  const message = useMemo(
    () =>
      `${update.event.createdBy.username} set the group description ${update.descriptionAfter}`,
    [update]
  );
  return <ChatUpdate message={message} />;
};

ChatDescriptionUpdate.fragments = {
  update: gql`
    fragment ChatDescriptionUpdateComponent on ChatDescriptionUpdate {
      event {
        createdBy {
          id
          username
        }
      }
      descriptionAfter
    }
  `,
};

export default ChatDescriptionUpdate;
