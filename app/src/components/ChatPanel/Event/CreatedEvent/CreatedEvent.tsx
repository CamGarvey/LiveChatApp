import { gql } from '@apollo/client';
import { Message } from './Payload/Message';
import OutgoingEvent from '../OutgoingEvent';
import { Group } from '@mantine/core';
import IncomingEvent from '../IncomingEvent';
import { CreatedEventComponentFragment } from 'graphql/generated/graphql';
import ChatDescriptionUpdate from './Payload/ChatUpdate/ChatDescriptionUpdate';
import ChatMembersAddedUpdate from './Payload/ChatUpdate/ChatMembersAddedUpdate';
import ChatMembersRemovedUpdate from './Payload/ChatUpdate/ChatMembersRemovedUpdate';
import ChatNameUpdate from './Payload/ChatUpdate/ChatNameUpdate';

type Props = {
  displayAvatar: boolean;
  event: CreatedEventComponentFragment;
};

export const CreatedEvent = ({ event, displayAvatar }: Props) => {
  switch (event.payload.__typename) {
    case 'Message':
      return <Message displayAvatar={displayAvatar} message={event.payload} />;
    case 'ChatNameUpdate':
      return <ChatNameUpdate update={event.payload} />;
    case 'ChatDescriptionUpdate':
      return <ChatDescriptionUpdate update={event.payload} />;
    case 'ChatMembersAddedUpdate':
      return <ChatMembersAddedUpdate update={event.payload} />;
    case 'ChatMembersRemovedUpdate':
      return <ChatMembersRemovedUpdate update={event.payload} />;
    default:
      return <>unknown event payload</>;
  }
};

CreatedEvent.fragments = {
  event: gql`
    fragment CreatedEventComponent on CreatedEvent {
      isCreator
      payload {
        ... on Message {
          ...MessageComponent
        }
        ... on ChatNameUpdate {
          ...ChatNameUpdateComponent
        }
        ... on ChatDescriptionUpdate {
          ...ChatDescriptionUpdateComponent
        }
        ... on ChatMembersAddedUpdate {
          ...ChatMembersAddedUpdateComponent
        }
        ... on ChatMembersRemovedUpdate {
          ...ChatMembersRemovedUpdateComponent
        }
      }
    }
    ${Message.fragments.message}
    ${ChatNameUpdate.fragments.update}
    ${ChatDescriptionUpdate.fragments.update}
    ${ChatMembersAddedUpdate.fragments.update}
    ${ChatMembersRemovedUpdate.fragments.update}
  `,
};
