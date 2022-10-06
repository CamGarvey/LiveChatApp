
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
      "RequestAcceptedAlert",
      "RequestDeclinedAlert"
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
      "ChatCreatedAlert",
      "ChatDeletedAlert",
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
    