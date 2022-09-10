
      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "Alert": [
      "NewFriendAlert"
    ],
    "Chat": [
      "DeletedChat",
      "DirectMessageChat",
      "GroupChat"
    ],
    "Event": [
      "ChatUpdate",
      "DeletedEvent",
      "Message"
    ],
    "KnownUser": [
      "Friend",
      "Me"
    ],
    "Notification": [
      "FriendRequest",
      "NewFriendAlert"
    ],
    "Request": [
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
    