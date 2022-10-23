
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
      "AdminsAddedEvent",
      "AdminsRemovedEvent",
      "DescriptionUpdatedEvent",
      "MembersAddedEvent",
      "MembersRemovedEvent",
      "NameUpdatedEvent"
    ],
    "Event": [
      "AdminsAddedEvent",
      "AdminsRemovedEvent",
      "DeletedEvent",
      "DescriptionUpdatedEvent",
      "MembersAddedEvent",
      "MembersRemovedEvent",
      "MessageEvent",
      "NameUpdatedEvent"
    ],
    "KnownUser": [
      "Friend",
      "Me"
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
    ],
    "UserAlterationEvent": [
      "AdminsAddedEvent",
      "AdminsRemovedEvent",
      "MembersAddedEvent",
      "MembersRemovedEvent"
    ]
  }
};
      export default result;
    