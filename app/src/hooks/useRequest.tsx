import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationUpdaterFunction,
} from '@apollo/client';
import {
  AcceptRequestMutation,
  Exact,
  GetNotificationsDocument,
  GetNotificationsQuery,
  useAcceptRequestMutation,
  useCancelRequestMutation,
  useDeclineRequestMutation,
} from 'graphql/generated/graphql';

gql`
  mutation AcceptRequest($requestId: HashId!) {
    acceptRequest(requestId: $requestId) {
      ...UseRequest
      createdBy {
        id
      }
    }
  }
  mutation DeclineRequest($requestId: HashId!) {
    declineRequest(requestId: $requestId) {
      ...UseRequest
    }
  }
  mutation CancelRequest($requestId: HashId!) {
    cancelRequest(requestId: $requestId) {
      ...UseRequest
    }
  }

  fragment UseRequest on Request {
    id
    isCreator
    createdById
    recipientId
    state
  }
`;

export const useRequest = () => {
  const [accept, { loading: loadingAccept }] = useAcceptRequestMutation();
  const [decline, { loading: loadingDecline }] = useDeclineRequestMutation();
  const [cancel, { loading: loadingCancel }] = useCancelRequestMutation();

  const acceptRequest = (requestId: string) =>
    accept({
      variables: {
        requestId,
      },
      update: removeRequest(requestId),
    });

  const declineRequest = (requestId: string) =>
    decline({
      variables: {
        requestId,
      },
      update: removeRequest(requestId),
    });

  const cancelRequest = (requestId: string) =>
    cancel({
      variables: {
        requestId,
      },
    });

  return {
    declineRequest,
    acceptRequest,
    cancelRequest,
    loading: loadingDecline || loadingAccept || loadingCancel,
  };
};

const removeRequest =
  (
    requestId: string
  ): MutationUpdaterFunction<
    AcceptRequestMutation,
    Exact<{
      requestId: any;
    }>,
    DefaultContext,
    ApolloCache<any>
  > =>
  (cache) =>
    cache.updateQuery<GetNotificationsQuery>(
      {
        query: GetNotificationsDocument,
      },
      (data) => ({
        notifications:
          data?.notifications.filter((x) => x.id !== requestId) ?? [],
      })
    );
