import { gql } from '@apollo/client';
import { Group, Text } from '@mantine/core';
import { IconGhost } from '@tabler/icons';
import { DeletedEventComponentFragment } from 'graphql/generated/graphql';
import IncomingEvent from './IncomingEvent';
import OutgoingEvent from './OutgoingEvent';

type Props = {
  event: DeletedEventComponentFragment;
  displayAvatar: boolean;
};

const DeletedEvent = ({ event, displayAvatar }: Props) => {
  if (event.isCreator) {
    return (
      <OutgoingEvent
        event={event}
        children={
          <Group
            spacing={'xs'}
            sx={{
              flexDirection: 'row-reverse',
            }}
          >
            <IconGhost color="grey" />
            <Text color={'dimmed'}>Deleted</Text>
          </Group>
        }
      />
    );
  }

  return (
    <IncomingEvent
      event={event}
      displayAvatar={displayAvatar}
      children={
        <Group
          spacing={'xs'}
          sx={{
            flexDirection: 'row',
          }}
        >
          <IconGhost color="grey" />
          <Text color={'dimmed'}>Deleted</Text>
        </Group>
      }
    />
  );
};

DeletedEvent.fragments = {
  event: gql`
    fragment DeletedEventComponent on DeletedEvent {
      id
      isCreator
      ...OutgoingEvent
      ...IncomingEvent
      ...MessageActionsEvent
    }
    ${OutgoingEvent.fragments.event}
    ${IncomingEvent.fragments.event}
  `,
};

export default DeletedEvent;
