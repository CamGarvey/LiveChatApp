
      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "Alert": [
      "ChatCreated",
      "ChatDeleted",
      "FriendDeleted",
      "RequestAccepted",
      "RequestDeclined"
    ],
    "Chat": [
      "DeletedChat",
      "DirectMessageChat",
      "GroupChat"
    ],
    "ChatSubscriptionResult": [
      "DeletedChat",
      "DirectMessageChat",
      "GroupChat"
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
      "ChatCreated",
      "ChatDeleted",
      "FriendDeleted",
      "FriendRequest",
      "RequestAccepted",
      "RequestDeclined"
    ],
    "Request": [
      "FriendRequest"
    ],
    "User": [
      "Friend",
      "Me",
      "Stranger"
    ],
    "UserAlteration": [
      "AdminsAdded",
      "AdminsRemoved",
      "MembersAdded",
      "MembersRemoved"
    ]
  }
};
      export default result;
    