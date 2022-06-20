import { useAuth0 } from '@auth0/auth0-react';
import {
  ActionIcon,
  Avatar,
  Button,
  Center,
  Drawer as MantineDrawer,
  Group,
  Loader,
  MediaQuery,
  Skeleton,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useEffect } from 'react';
import { Logout, Search, SquarePlus } from 'tabler-icons-react';
import {
  useGetChannelsForNavQuery,
  useGetMeLazyQuery,
} from '../../graphql/generated/graphql';
import { ModalType } from '../../models';
import { useToggleDrawer, useIsDrawerOpen, useOpenModal } from '../store';
import ChannelItem from '../shared/ChannelItem';

const Drawer = () => {
  const { loading, data } = useGetChannelsForNavQuery();
  const isDrawerOpen = useIsDrawerOpen();
  const toggleDrawer = useToggleDrawer();

  const openCreateChannelModal = useOpenModal(ModalType.CreateChannel);
  const openUserSearchModal = useOpenModal(ModalType.UserSeach);
  const { user, isAuthenticated, logout } = useAuth0();

  const [getMeData, { data: meData, loading: loadingMe }] = useGetMeLazyQuery();

  useEffect(() => {
    if (isAuthenticated) {
      getMeData();
    }
  }, [isAuthenticated, user, getMeData]);

  return (
    <MediaQuery largerThan={'sm'} styles={{ display: 'none' }}>
      <MantineDrawer
        opened={isDrawerOpen}
        onClose={toggleDrawer}
        zIndex={9999}
        withinPortal={false}
        size={'xl'}
        styles={{
          drawer: {
            marginTop: '70px',
          },
          root: {
            marginTop: '70px',
          },
        }}
        padding={10}
        overlayOpacity={0}
        closeOnClickOutside={false}
        withCloseButton={false}
      >
        {isAuthenticated ? (
          <>
            {loadingMe || meData?.me == null ? (
              <Group>
                <Skeleton circle />
                <Skeleton />
              </Group>
            ) : (
              <Stack spacing={'md'}>
                <Group>
                  <Avatar
                    size="md"
                    src={`https://avatars.dicebear.com/api/initials/${meData.me.username}.svg`}
                    style={{ marginTop: 'auto' }}
                  />
                  <Title order={5}>{meData.me.username}</Title>
                  <Group ml={'auto'}>
                    <ActionIcon
                      onClick={() => {
                        toggleDrawer();
                        openUserSearchModal();
                      }}
                    >
                      <Search />
                    </ActionIcon>
                    <ActionIcon onClick={() => logout()}>
                      <Logout />
                    </ActionIcon>
                  </Group>
                </Group>

                <Group>
                  <Text>Channels</Text>
                  <ActionIcon
                    ml={'auto'}
                    onClick={() => {
                      toggleDrawer();
                      openCreateChannelModal();
                    }}
                  >
                    <SquarePlus />
                  </ActionIcon>
                </Group>
                {!loading &&
                  data &&
                  data.channels.map((channel) => {
                    return (
                      <ChannelItem
                        key={channel.id}
                        {...channel}
                        onClick={toggleDrawer}
                      />
                    );
                  })}
              </Stack>
            )}
          </>
        ) : (
          <>Login!</>
        )}
      </MantineDrawer>
    </MediaQuery>
  );
};

export default Drawer;
