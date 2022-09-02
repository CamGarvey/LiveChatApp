import {
  Button,
  Center,
  Input,
  Loader,
  ScrollArea,
  Stack,
  Text,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import { useRef, useState } from 'react';
import UserItem from './UserItem';
import UserMenu from './UserItem/UserMenu';

type Props = {
  users: any[];
  input?: {
    placeholder?: string;
  };
  loading?: boolean;
  hasNextPage?: boolean;
  onNextPageClick?: () => void;
  onInputChange?: (value: string) => void;
};

const UserList = ({
  users,
  input,
  onNextPageClick,
  onInputChange,
  loading = false,
  hasNextPage = false,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>();
  const [hasInput, setHasInput] = useState(false);

  return (
    <>
      <Input.Wrapper>
        <Input
          icon={<IconSearch />}
          placeholder={input?.placeholder}
          ref={inputRef}
          onChange={(e: any) => {
            const value = e.target.value;
            setHasInput(!!value);
            if (value === '') {
              return;
            }
            onInputChange?.(value);
          }}
        />
      </Input.Wrapper>
      {hasInput && !loading && users.length !== 0 ? (
        <>
          <Stack
            pt={'10px'}
            style={{
              maxHeight: '490px',
            }}
          >
            <ScrollArea
              style={{
                height: '500px',
              }}
              offsetScrollbars
            >
              <>
                {users.map((user) => {
                  return (
                    <UserItem
                      key={user.id}
                      user={user}
                      menu={<UserMenu user={user} />}
                    />
                  );
                })}
              </>
            </ScrollArea>
          </Stack>
          {hasNextPage && (
            <Button fullWidth onClick={() => onNextPageClick?.()}>
              Load More
            </Button>
          )}
        </>
      ) : (
        hasInput && (
          <Center py={10}>
            {loading && <Loader variant="dots" />}
            {!loading && users.length === 0 && (
              <Text color={'dimmed'}>No users found</Text>
            )}
          </Center>
        )
      )}
    </>
  );
};

export default UserList;
