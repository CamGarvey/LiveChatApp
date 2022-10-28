import { gql } from '@apollo/client';
import { MediaQuery, Aside } from '@mantine/core';
import { useGetChatForChatAsideLazyQuery } from 'graphql/generated/graphql';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import ClosedAside from './ClosedAside';
import OpenedAside from './OpenedAside/OpenedAside';

gql`
  query GetChatForChatAside($chatId: HashId!, $firstMembers: Int = 30, $afterMember: String) {
    chat(chatId: $chatId) {
      ...ClosedAsideChat
      ...OpenedAsideChat
      ... on GroupChat {
        members(first: $firstMembers, after: $afterMember) {
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }
    ${ClosedAside.fragments.chat}
    ${OpenedAside.fragments.chat}
  }
`;

const ChatAside = () => {
  const { chatId } = useParams();
  const [opened, setOpened] = useState(true);
  const [getChat, { data, loading, fetchMore }] =
    useGetChatForChatAsideLazyQuery();

  useEffect(() => {
    if (chatId)
      getChat({
        variables: {
          chatId,
        },
      });
  }, [chatId, getChat]);

  const width = useMemo(() => (opened ? 300 : 75), [opened]);

  const chat = data?.chat;

  if (!chatId) return <></>;

  return (
    <MediaQuery smallerThan="xs" styles={{ display: 'none' }}>
      <Aside
        p="md"
        hiddenBreakpoint="md"
        width={{ xs: width, sm: width, md: width, lg: width, xl: width }}
        sx={{
          gap: '4px',
        }}
      >
        <OpenedAside
          chat={chat}
          loading={loading}
          onClose={() => setOpened(false)}
        />
      </Aside>
    </MediaQuery>
  );
};

export default ChatAside;
