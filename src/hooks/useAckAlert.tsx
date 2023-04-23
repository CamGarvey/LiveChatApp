import { gql } from '@apollo/client';

gql`
  mutation AcknoledgeAlert($alertId: HashId!) {
    acknowledgeAlert(alertId: $alertId) {
      id
    }
  }
`;

const useAckAlert = () => {
  // return useAcknoledgeAlertMutation({
  //   update: (cache, { data }) => {
  //     cache.updateQuery<GetNotificationsQuery>(
  //       {
  //         query: GetNotificationsDocument,
  //       },
  //       (q) => {
  //         if (q) {
  //           return {
  //             notifications: q.notifications.filter((x) => x.id !== data?.acknowledgeAlert?.id),
  //           };
  //         }
  //       }
  //     );
  //   },
  // });
};

export default useAckAlert;
