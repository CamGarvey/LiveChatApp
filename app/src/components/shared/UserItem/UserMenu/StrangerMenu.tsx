import { gql } from '@apollo/client';
import { ActionIcon, Menu, Tooltip } from '@mantine/core';
import { useStranger } from 'hooks';
import {
  IconMailbox,
  IconMailForward,
  IconPlus,
  IconMinus,
  IconUserPlus,
} from '@tabler/icons';
import { StrangerMenuStrangerFragment } from 'graphql/generated/graphql';
import { useRequest } from 'hooks';
import useDefaultColor from 'hooks/useDefaultColor';

type Props = {
  stranger: StrangerMenuStrangerFragment;
  target?: {
    icon?: React.ReactNode;
  };
  items?: React.ReactNode;
  loading?: boolean;
  iconSize?: number;
};

const StrangerMenu = ({
  stranger,
  iconSize = 14,
  target,
  items,
  loading = false,
}: Props) => {
  const {
    status,
    sendFriendRequest,
    loading: loadingRequest,
  } = useStranger(stranger);
  const { acceptRequest, declineRequest, cancelRequest } = useRequest();
  const defaultColor = useDefaultColor();

  return (
    <Menu width={'max-content'}>
      <Menu.Target>
        <Tooltip hidden={!!stranger} label={!stranger && 'Failed to load user'}>
          <ActionIcon
            loaderProps={{
              color: defaultColor,
            }}
            loading={loadingRequest || loading}
          >
            {target?.icon ? (
              <>{target.icon}</>
            ) : (
              <>
                {status === 'RECEIVED_FRIEND_REQUEST' && <IconMailbox />}
                {status === 'SENT_FRIEND_REQUEST' && <IconMailForward />}
                {status === 'NO_FRIEND_REQUEST' && <IconUserPlus />}
              </>
            )}
          </ActionIcon>
        </Tooltip>
      </Menu.Target>
      {stranger && (
        <Menu.Dropdown>
          <>
            {status === 'RECEIVED_FRIEND_REQUEST' && (
              <>
                <Menu.Label>Friend Request</Menu.Label>
                <Menu.Item
                  color={'green'}
                  icon={<IconPlus size={iconSize} />}
                  disabled={stranger.friendRequest === null}
                  onClick={() => acceptRequest(stranger.friendRequest?.id)}
                >
                  Accept
                </Menu.Item>
                <Menu.Item
                  color={'red'}
                  icon={<IconMinus size={iconSize} />}
                  disabled={stranger.friendRequest === null}
                  onClick={() => declineRequest(stranger.friendRequest?.id)}
                >
                  Decline
                </Menu.Item>
              </>
            )}
            {status === 'SENT_FRIEND_REQUEST' && (
              <Menu.Item
                disabled={stranger.friendRequest === null}
                onClick={() => cancelRequest(stranger.friendRequest?.id)}
              >
                Cancel Friend Request
              </Menu.Item>
            )}
            {status === 'NO_FRIEND_REQUEST' && (
              <Menu.Item
                icon={<IconMailForward size={iconSize} />}
                onClick={() => sendFriendRequest()}
              >
                Send Friend Request
              </Menu.Item>
            )}
          </>
          {items && (
            <>
              <Menu.Divider />
              {items}
            </>
          )}
        </Menu.Dropdown>
      )}
    </Menu>
  );
};

StrangerMenu.fragments = {
  stranger: gql`
    fragment StrangerMenuStranger on Stranger {
      ...UseStranger
    }
    ${useStranger.fragments.user}
  `,
};

export default StrangerMenu;
