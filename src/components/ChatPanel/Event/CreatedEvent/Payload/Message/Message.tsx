import { gql } from '@apollo/client';
import { MessageComponentFragment, useDeleteMessageMutation } from 'graphql/generated/graphql';
import IncomingEvent from '../../../IncomingEvent';
import OutgoingEvent from '../../../OutgoingEvent';
import MessageBubble from './MessageBubble';
import DeleteEventAction from 'components/ChatPanel/Event/DeleteEventAction';

gql`
  mutation DeleteMessage($eventId: HashId!) {
    deleteEvent(eventId: $eventId) {
      id
    }
  }
`;

type Props = {
  message: MessageComponentFragment;
  displayAvatar: boolean;
};

export const Message = ({ message, displayAvatar }: Props) => {
  const [deleteMessage] = useDeleteMessageMutation();

  if (message.event.isCreator) {
    return (
      <OutgoingEvent
        event={message.event}
        state={(message.event.id as string).startsWith('temp-id') ? 'sending' : 'sent'}
        children={
          <MessageBubble
            message={message}
            variant={message.event.isCreator ? 'light' : 'default'}
          />
        }
        actions={
          message.event.isCreator && (
            <DeleteEventAction
              onDelete={() => {
                deleteMessage({
                  variables: {
                    eventId: message.event.id,
                  },
                });
              }}
            />
          )
        }
      />
    );
  }

  return (
    <IncomingEvent
      event={message.event}
      displayAvatar={displayAvatar}
      children={
        <MessageBubble message={message} variant={message.event.isCreator ? 'light' : 'default'} />
      }
    />
  );
};

Message.fragments = {
  message: gql`
    fragment MessageComponent on Message {
      event {
        id
        isCreator
        ...OutgoingEvent
        ...IncomingEvent
        ...MessageActionsEvent
      }
      content
    }
    ${OutgoingEvent.fragments.event}
    ${IncomingEvent.fragments.event}
  `,
};
