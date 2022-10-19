import { gql } from '@apollo/client';
import { MediaQuery, Aside } from '@mantine/core';
import { useGetChatForChatInfoAsideLazyQuery } from 'graphql/generated/graphql';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import ClosedAside from './ClosedAside';
import OpenedAside from './OpenedAside/OpenedAside';

gql`
  query GetChatForChatInfoAside($chatId: HashId!) {
    chat(chatId: $chatId) {
      ...ClosedAsideChat
      ...OpenedAsideChat
    }
  }
`;

const ChatInfoAside = () => {
  const { chatId } = useParams();
  const [opened, setOpened] = useState(false);
  const [getChat, { data, loading }] = useGetChatForChatInfoAsideLazyQuery();

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
      >
        {opened ? (
          <OpenedAside
            chat={chat}
            loading={loading}
            onClose={() => setOpened(false)}
          />
        ) : (
          <ClosedAside
            chat={chat}
            loading={loading}
            onOpen={() => setOpened(true)}
          />
        )}
      </Aside>
    </MediaQuery>
  );
};

export default ChatInfoAside;
