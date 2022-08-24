import { gql } from '@apollo/client';
import { MessageActionsFragment } from 'graphql/generated/graphql';
import React from 'react';
import DeleteEventAction from '../DeleteEventAction';

type Props = {
  message: MessageActionsFragment;
  onDelete: () => void;
};

const MessageActions = ({ message, onDelete }: Props) => {
  if (message.__typename === 'DeletedMessage' || !message.isCreator) {
    return;
  }
  return (
    <>
      <DeleteEventAction onDelete={onDelete} />
    </>
  );
};

MessageActions.fragments = {
  message: gql`
    fragment MessageActions on Message {
      __typename
      isCreator
    }
  `,
};

export default MessageActions;
