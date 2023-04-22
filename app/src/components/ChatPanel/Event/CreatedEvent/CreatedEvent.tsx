import { gql } from '@apollo/client';
import DescriptionUpdate from './Payload/ChatUpdate/DescriptionChangedUpdate';
import ChatMembersAddedUpdate from './Payload/ChatUpdate/MembersAddedUpdate';
import MembersRemovedUpdate from './Payload/ChatUpdate/MembersRemovedUpdate';
import NameChangedUpdate from './Payload/ChatUpdate/NameChangedUpdate';
import { Message } from './Payload/Message';
import { CreatedEventComponentFragment } from 'graphql/generated/graphql';

type Props = {
  displayAvatar: boolean;
  event: CreatedEventComponentFragment;
};

export const CreatedEvent = ({ event, displayAvatar }: Props) => {
  switch (event.payload.__typename) {
    case 'Message':
      return <Message displayAvatar={displayAvatar} message={event.payload} />;
    case 'NameChangedUpdate':
      return <NameChangedUpdate update={event.payload} />;
    case 'DescriptionChangedUpdate':
      return <DescriptionUpdate update={event.payload} />;
    case 'MembersAddedUpdate':
      return <ChatMembersAddedUpdate update={event.payload} />;
    case 'MembersRemovedUpdate':
      return <MembersRemovedUpdate update={event.payload} />;
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
        ... on NameChangedUpdate {
          ...NameChangedUpdateComponent
        }
        ... on DescriptionChangedUpdate {
          ...DescriptionChangedUpdateComponent
        }
        ... on MembersAddedUpdate {
          ...MembersAddedUpdateComponent
        }
        ... on MembersRemovedUpdate {
          ...MembersRemovedUpdateComponent
        }
      }
    }
    ${Message.fragments.message}
    ${NameChangedUpdate.fragments.update}
    ${DescriptionUpdate.fragments.update}
    ${ChatMembersAddedUpdate.fragments.update}
    ${MembersRemovedUpdate.fragments.update}
  `,
};
