import { useDeleteMessageMutation } from '../../../../graphql/generated/graphql';
import IncomingEvent from '../IncomingEvent';
import OutgoingEvent from '../OutgoingEvent';
import DeletedMessage from './DeletedMessage';
import MessageActions from './MessageActions';
import MessageBubble from './MessageBubble';

type MessageData = {
  id: string;
  isCreator: boolean;
  createdBy: {
    id: string;
    username: string;
  };
  createdAt: string;
};

type DeletedMessage = MessageData & {
  __typename?: 'DeletedMessage';
};

type InstantMessage = MessageData & {
  __typename?: 'InstantMessage';
  content: string;
};

type Props = {
  data: DeletedMessage | InstantMessage;
  isLastMessageInGroup: boolean;
};

const Message = ({ data, isLastMessageInGroup }: Props) => {
  const [deleteMessage] = useDeleteMessageMutation();
  const messageContent =
    data.__typename === 'DeletedMessage' ? (
      <DeletedMessage />
    ) : (
      <MessageBubble
        content={data.content}
        variant={data.isCreator ? 'light' : 'default'}
      />
    );

  if (data.isCreator) {
    return (
      <OutgoingEvent
        {...data}
        state={(data.id as string).startsWith('temp-id') ? 'sending' : 'sent'}
        children={messageContent}
        actions={
          <MessageActions
            data={data}
            onDelete={() => {
              deleteMessage({
                variables: {
                  messageId: data.id,
                },
              });
            }}
          />
        }
      />
    );
  }

  return (
    <IncomingEvent
      {...data}
      displayAvatar={isLastMessageInGroup}
      children={messageContent}
    />
  );
};

export default Message;
