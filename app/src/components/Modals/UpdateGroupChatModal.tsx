import { gql } from '@apollo/client';
import { Button, Input, Stack } from '@mantine/core';
import { ContextModalProps, useModals } from '@mantine/modals';
import { Formik } from 'formik';
import {
  UpdateGroupUserFragment,
  UseUpdateGroupChatModelChatFragment,
  useGetFriendsForUpdateQuery,
  useGetMembersForUpdateQuery,
} from 'graphql/generated/graphql';
import { useUpdateGroupChat } from 'hooks/useUpdateGroupChat/useUpdateGroupChat';
import _ from 'lodash';
import { groupChatSchema } from 'models/validation-schemas';
import { useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import UserMultiSelect from '../shared/UserSelector/UserMultiSelect';

gql`
  query GetMembersForUpdate($chatId: HashId!, $first: Int = 300) {
    members(chatId: $chatId, first: $first) {
      edges {
        node {
          role
          user {
            ...UpdateGroupUser
          }
        }
      }
    }
  }
  query GetFriendsForUpdate($first: Int = 300) {
    friends(first: $first) {
      edges {
        node {
          ...UpdateGroupUser
        }
      }
    }
  }
  fragment UpdateGroupUser on User {
    id
    username
  }
`;

type Props = {
  chat: UseUpdateGroupChatModelChatFragment;
};

export const UpdateGroupChatModal = ({
  context,
  id,
  innerProps: { chat },
}: ContextModalProps<Props>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const update = useUpdateGroupChat();
  const members = useGetMembersForUpdateQuery({
    variables: {
      chatId: chat.id,
    },
  });
  const friends = useGetFriendsForUpdateQuery();

  const canRemoveUser = useCallback(
    (user: UpdateGroupUserFragment) => {
      if (chat.isCreator && chat.createdById !== user.id) {
        return true;
      }
      return false;
    },
    [chat]
  );

  const defaultUserIds = useMemo<string[]>(
    () => members.data?.members?.edges?.map((x) => x.node.user.id) ?? [],
    [members]
  );

  // Since other friends can add either friends
  // We need to make sure that we get all of the users in the chat
  // So that if the user takes a non friend out of the UserSelector
  // they can add them back in if it was a mistake
  const users = useMemo(() => {
    const users: (UpdateGroupUserFragment & { canRemove?: boolean })[] = _.unionBy(
      members.data?.members?.edges?.map((x) => x.node.user) ?? [],
      friends.data?.friends.edges?.map((user) => user.node) ?? [],
      'id'
    );
    return users.map((user) => ({
      ...user,
      canRemove: canRemoveUser(user),
    }));
  }, [members, friends, canRemoveUser]);

  return (
    <Stack>
      <Formik
        initialValues={{
          name: chat.name,
          description: chat.description,
          userIds: defaultUserIds,
        }}
        validationSchema={groupChatSchema}
        onSubmit={(values) => {
          const membersToAdd = values.userIds.filter((x) => !defaultUserIds.includes(x));
          const membersToRemove = defaultUserIds.filter((x) => !values.userIds.includes(x));

          if (chat.name !== values.name) {
            update.name(chat.id, values.name);
          }
          if (chat.description !== values.description) {
            update.description(chat.id, values.description!);
          }
          if (membersToAdd.length > 0) {
            update.members.add(chat.id, membersToAdd);
          }
          if (membersToRemove.length > 0) {
            update.members.remove(chat.id, membersToRemove);
          }
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Stack>
              <Input.Wrapper required error={props.touched.name && props.errors.name} label="Name">
                <Input
                  id="name"
                  type="text"
                  ref={inputRef}
                  onChange={props.handleChange}
                  value={props.values.name}
                />
              </Input.Wrapper>
              <Input.Wrapper error={props.errors.description} label="Description">
                <Input
                  id="description"
                  type="text"
                  onChange={props.handleChange}
                  value={props.values.description ?? ''}
                />
              </Input.Wrapper>
              <Input.Wrapper>
                <UserMultiSelect
                  label={'Members'}
                  users={users}
                  defaultValue={defaultUserIds}
                  dropdownPosition="top"
                  onChange={(value: any) => {
                    props.setFieldValue('memberIds', value);
                  }}
                />
              </Input.Wrapper>
              <Button
                type="submit"
                loading={update.loading}
                disabled={friends.loading || members.loading || !props.dirty}
              >
                Update
              </Button>
            </Stack>
          </form>
        )}
      </Formik>
      {chat.isCreator && (
        <Button
          loading={update.loading}
          color={'red'}
          disabled={friends.loading}
          onClick={() => {
            update.delete(chat).then(() => {
              navigate('/chats', { replace: true });
              context.closeModal(id);
            });
          }}
        >
          Delete
        </Button>
      )}
    </Stack>
  );
};

export const useUpdateGroupChatModal = () => {
  const modals = useModals();
  return (props: Props) =>
    modals.openContextModal('updateGroupChat', {
      title: 'Update Group Chat',
      innerProps: props,
    });
};

useUpdateGroupChatModal.fragments = {
  chat: gql`
    fragment UseUpdateGroupChatModelChat on GroupChat {
      id
      name
      description
      isCreator
      createdById
    }
  `,
};
