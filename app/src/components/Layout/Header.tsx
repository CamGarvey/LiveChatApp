import { useAuth0 } from '@auth0/auth0-react';
import {
  Group,
  Title,
  ActionIcon,
  Input,
  Button,
  Header as MHeader,
  Menu,
  useMantineColorScheme,
  Text,
  Center,
  Stack,
  Avatar,
  Tooltip,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import {
  Sun,
  MoonStars,
  UserCircle,
  Logout,
  Bell,
  Check,
  SquareX,
  CircleCheck,
  CircleX,
} from 'tabler-icons-react';
import {
  useAcceptFriendRequestMutation,
  useDeclineFriendRequestMutation,
  useGetDataForHeaderLazyQuery,
} from '../../graphql/generated/graphql';
import UserSearchModal from '../UserSearchModal/UserSearchModal';

type Props = {};

const Header = (props: Props) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
    useAuth0();
  const [friendSearchOpen, setFriendSearchOpen] = useState(false);

  const [getData, { loading, data, error }] = useGetDataForHeaderLazyQuery();
  const [acceptRequest] = useAcceptFriendRequestMutation();
  const [declineRequest] = useDeclineFriendRequestMutation();

  useEffect(() => {
    if (isAuthenticated) {
      getData();
    }
  }, [isAuthenticated, user, getData]);

  const receivedFriendRequests = data?.me?.receivedFriendRequests ?? [];

  return (
    <MHeader height={70} p="md">
      <Group>
        <Title>Hams Chat</Title>
        <Group sx={{ height: '100%' }} px={20} position="apart" ml={'auto'}>
          <ActionIcon
            variant="default"
            onClick={() => toggleColorScheme()}
            size={30}
          >
            {colorScheme === 'dark' ? (
              <Sun size={16} />
            ) : (
              <MoonStars size={16} />
            )}
          </ActionIcon>
          {isAuthenticated ? (
            <Group>
              <Menu
                size={'auto'}
                control={
                  <ActionIcon>
                    <Bell />
                  </ActionIcon>
                }
              >
                <Stack>
                  <Center>
                    <Title order={6}>Friend Requests</Title>
                  </Center>
                  {receivedFriendRequests.length ? (
                    receivedFriendRequests.map((request) => (
                      <FriendRequest
                        {...request}
                        onDecline={() => {
                          declineRequest({
                            variables: {
                              friendId: request.id,
                            },
                          });
                        }}
                        onAccept={() => {
                          acceptRequest({
                            variables: {
                              friendId: request.id,
                            },
                          });
                        }}
                      />
                    ))
                  ) : (
                    <Text>No notifications</Text>
                  )}
                </Stack>
              </Menu>
              <Input
                icon={''}
                placeholder="Find your friends!"
                onClick={() => {
                  setFriendSearchOpen(true);
                }}
              />
              {friendSearchOpen && (
                <UserSearchModal
                  isOpen={friendSearchOpen}
                  onClose={() => {
                    setFriendSearchOpen(false);
                  }}
                />
              )}
              <Menu>
                <Menu.Item icon={<UserCircle />}>
                  <Text>{data?.me.username}</Text>
                </Menu.Item>
                <Menu.Item icon={<Logout />} onClick={() => logout()}>
                  <Text>Logout</Text>
                </Menu.Item>
              </Menu>
            </Group>
          ) : (
            <Button loading={isLoading} onClick={() => loginWithRedirect()}>
              Login
            </Button>
          )}
        </Group>
      </Group>
    </MHeader>
  );
};

type FriendRequestProps = {
  name?: string;
  username: string;
  onAccept: () => void;
  onDecline: () => void;
};

const FriendRequest = ({
  name,
  username,
  onDecline,
  onAccept,
}: FriendRequestProps) => {
  return (
    <Group>
      <Avatar
        size="sm"
        src={`https://avatars.dicebear.com/api/initials/${username}.svg`}
      />
      <Stack spacing={0}>
        <Text>{name}</Text>
        <Text>{username}</Text>
      </Stack>

      <Group ml={'auto'}>
        <Tooltip label="Decline" openDelay={200} withArrow>
          <ActionIcon onClick={onDecline}>
            <CircleX />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Accept" openDelay={200} withArrow>
          <ActionIcon onClick={onAccept}>
            <CircleCheck />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Group>
  );
};

export default Header;
