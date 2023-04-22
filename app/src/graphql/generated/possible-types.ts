
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
    "ChatUpdate": [
      "DescriptionChangedUpdate",
      "MembersAddedUpdate",
      "MembersRemovedUpdate",
      "NameChangedUpdate",
      "RoleChangedUpdate"
    ],
    "Event": [
      "CreatedEvent",
      "DeletedEvent"
    ],
    "Member": [
      "ChatMember",
      "RemovedMember"
    ],
    "MemberAlteration": [
      "MembersAddedUpdate",
      "MembersRemovedUpdate",
      "RoleChangedUpdate"
    ],
    "PayloadUnion": [
      "DescriptionChangedUpdate",
      "MembersAddedUpdate",
      "MembersRemovedUpdate",
      "Message",
      "NameChangedUpdate"
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
    