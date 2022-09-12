
      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "Alert": [
      "ChatCreatedAlert",
      "ChatDeletedAlert",
      "FriendDeletedAlert",
      "NewFriend"
    ],
    "Chat": [
      "DeletedChat",
      "DirectMessageChat",
      "GroupChat"
    ],
    "ChatSubscriptionResult": [
      "AdminsAdded",
      "AdminsRemoved",
      "DescriptionUpdated",
      "DirectMessageChat",
      "GroupChat",
      "MembersAdded",
      "MembersRemoved",
      "NameUpdated"
    ],
    "ChatUpdate": [
      "AdminsAdded",
      "AdminsRemoved",
      "DescriptionUpdated",
      "MembersAdded",
      "MembersRemoved",
      "NameUpdated"
    ],
    "Event": [
      "AdminsAdded",
      "AdminsRemoved",
      "DeletedEvent",
      "DescriptionUpdated",
      "MembersAdded",
      "MembersRemoved",
      "Message",
      "NameUpdated"
    ],
    "KnownUser": [
      "Friend",
      "Me"
    ],
    "Notification": [
      "ChatCreatedAlert",
      "ChatDeletedAlert",
      "FriendDeletedAlert",
      "FriendRequest",
      "FriendRequestResponse",
      "NewFriend"
    ],
    "Request": [
      "FriendRequest"
    ],
    "Response": [
      "FriendRequestResponse"
    ],
    "User": [
      "Friend",
      "Me",
      "Stranger"
    ]
  }
};
      export default result;
    