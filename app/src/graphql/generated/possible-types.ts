
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
    "Event": [
      "DeletedMessage",
      "Message"
    ],
    "KnownUser": [
      "Friend",
      "Me"
    ],
    "MessageResult": [
      "DeletedMessage",
      "Message"
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
    