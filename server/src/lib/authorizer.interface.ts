export interface IAuthorizer {
  userId: number;
  canCreateDirectMessageChat: (friendId: number) => Promise<boolean>;
  canCreateGroupChat: (memberIds: number[]) => Promise<boolean>;
  canViewChat: (chatId: number) => Promise<boolean>;

  canUpdateGroupChatBasic: (data: { chatId: number }) => Promise<boolean>;
  canRemoveMembersFromGroupChat: (data: {
    chatId: number;
    members: number[];
  }) => Promise<boolean>;
  canAddMembersToGroupChat: (data: {
    chatId: number;
    members: number[];
  }) => Promise<boolean>;
  canRemoveAdminsFromGroupChat: (data: {
    chatId: number;
    members: number[];
  }) => Promise<boolean>;
  canAddAdminsToGroupChat: (data: {
    chatId: number;
    members: number[];
  }) => Promise<boolean>;

  canDeleteChat: (chatId: number) => Promise<boolean>;

  canViewEvent: (eventId: number) => Promise<boolean>;
  canCreateEvent: (chatId: number) => Promise<boolean>;
  canUpdateEvent: (eventId: number) => Promise<boolean>;
  canDeletedEvent: (eventId: number) => Promise<boolean>;

  canSendFriendRequest: (friendId: number) => Promise<boolean>;
  canCancelRequest: (requestId: number) => Promise<boolean>;
  canDeclineRequest: (requestId: number) => Promise<boolean>;
  canAcceptRequest: (requestId: number) => Promise<boolean>;

  canDeleteFriend: (friendId: number) => Promise<boolean>;
}
