
      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "Alert": [
      "ChatAdminAccessGrantedAlert",
      "ChatAdminAccessRevokedAlert",
      "ChatDeletedAlert",
      "ChatMemberAccessGrantedAlert",
      "ChatMemberAccessRevokedAlert",
      "FriendDeletedAlert",
      "RequestAcceptedAlert",
      "RequestDeclinedAlert"
    ],
    "Chat": [
      "DeletedChat",
      "DirectMessageChat",
      "GroupChat"
    ],
    "ChatAccessAlert": [
      "ChatAdminAccessGrantedAlert",
      "ChatAdminAccessRevokedAlert",
      "ChatMemberAccessGrantedAlert",
      "ChatMemberAccessRevokedAlert"
    ],
    "ChatSubscriptionResult": [
      "DeletedChat",
      "DirectMessageChat",
      "GroupChat"
    ],
    "ChatUpdateEvent": [
      "DescriptionUpdatedEvent",
      "MembersAddedEvent",
      "MembersRemovedEvent",
      "NameUpdatedEvent",
      "RoleChangedEvent"
    ],
    "Event": [
      "DeletedEvent",
      "DescriptionUpdatedEvent",
      "MembersAddedEvent",
      "MembersRemovedEvent",
      "MessageEvent",
      "NameUpdatedEvent",
      "RoleChangedEvent"
    ],
    "KnownUser": [
      "Friend",
      "Me"
    ],
    "MemberAlterationEvent": [
      "MembersAddedEvent",
      "MembersRemovedEvent",
      "RoleChangedEvent"
    ],
    "Notification": [
      "ChatAdminAccessGrantedAlert",
      "ChatAdminAccessRevokedAlert",
      "ChatDeletedAlert",
      "ChatMemberAccessGrantedAlert",
      "ChatMemberAccessRevokedAlert",
      "FriendDeletedAlert",
      "FriendRequest",
      "RequestAcceptedAlert",
      "RequestDeclinedAlert"
    ],
    "Request": [
      "FriendRequest"
    ],
    "RequestResponseAlert": [
      "RequestAcceptedAlert",
      "RequestDeclinedAlert"
    ],
    "User": [
      "Friend",
      "Me",
      "Stranger"
    ]
  }
};
      export default result;
    