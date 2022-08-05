
      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "Chat": [
      "DeletedChat",
      "DirectMessageChat",
      "GroupChat"
    ],
    "KnownUser": [
      "Friend",
      "Me"
    ],
    "Message": [
      "DeletedMessage",
      "InstantMessage"
    ],
    "Notification": [
      "ChatInvite",
      "FriendRequest"
    ],
    "Request": [
      "ChatInvite",
      "FriendRequest"
    ],
    "User": [
      "Friend",
      "Me",
      "Stranger"
    ]
  }
};
      export default result;
    