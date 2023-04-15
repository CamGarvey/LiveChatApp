
      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "Alert": [
      "ChatDeletedAlert",
      "ChatMemberAccessGrantedAlert",
      "FriendDeletedAlert"
    ],
    "Chat": [
      "DeletedChat",
      "DirectMessageChat",
      "ForbiddenChat",
      "GroupChat"
    ],
    "ChatAccessAlert": [
      "ChatMemberAccessGrantedAlert"
    ],
    "ChatAlert": [
      "ChatMemberAccessGrantedAlert"
    ],
    "ChatMemberAlteration": [
      "ChatMembersAddedUpdate",
      "ChatMembersRemovedUpdate"
    ],
    "ChatUpdate": [
      "ChatDescriptionUpdate",
      "ChatMembersAddedUpdate",
      "ChatMembersRemovedUpdate",
      "ChatNameUpdate"
    ],
    "Event": [
      "CreatedEvent",
      "DeletedEvent"
    ],
    "Member": [
      "ChatMember",
      "RemovedMember"
    ],
    "PayloadUnion": [
      "ChatDescriptionUpdate",
      "ChatMembersAddedUpdate",
      "ChatMembersRemovedUpdate",
      "ChatNameUpdate",
      "Message"
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
    