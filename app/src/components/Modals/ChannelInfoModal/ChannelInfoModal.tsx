import { ActionIcon, Group, ScrollArea, Text, Title } from '@mantine/core';
import { ContextModalProps, useModals } from '@mantine/modals';
import { UserPlus } from 'tabler-icons-react';
import { ChannelInfo } from '../../../models';
import { ChannelMenu, UserItem } from '../../shared/UserItem';
type Props = {
  channel: ChannelInfo;
};

export const ChannelInfoModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<Props>) => {
  const { channel } = innerProps;
  return (
    channel && (
      <>
        <Group>
          <Text>Members ({channel.members.length})</Text>
          <ActionIcon ml={'auto'} variant="light">
            <UserPlus size={16} />
          </ActionIcon>
        </Group>
        <ScrollArea
          offsetScrollbars={true}
          sx={{
            height: '400px',
          }}
        >
          {channel.members.map((member) => {
            return (
              <UserItem
                key={member.id}
                user={{ ...member }}
                menu={<ChannelMenu />}
              />
            );
          })}
        </ScrollArea>
      </>
    )
  );
};

export const useChannelInfoModal = () => {
  const modals = useModals();
  return (props: Props) =>
    modals.openContextModal('channelInfo', {
      title: props?.channel.name,
      innerProps: props,
    });
};
