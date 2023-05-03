import { gql } from '@apollo/client';
import { useGetChatForChatAsideQuery } from 'graphql/generated/graphql';
import { HeaderSection } from '../Sections';

gql`
  query GetChatForChatAside($chatId: HashId!) {
    chat(chatId: $chatId) {
      ...HeaderSectionChat
      ...MemberSectionChat
    }
  }
  ${HeaderSection.fragments.chat}
`;

export const useChat = (chatId: string) => {
  const { data, loading } = useGetChatForChatAsideQuery({
    variables: {
      chatId,
    },
  });

  return {
    chat: data?.chat,
    loading,
  };
};
