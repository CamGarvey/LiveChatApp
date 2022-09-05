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

  canViewMessage: (messageId: number) => Promise<boolean>;
  canCreateMessage: (chatId: number) => Promise<boolean>;
  canUpdateMessage: (messageId: number) => Promise<boolean>;
  canDeletedMessage: (messageId: number) => Promise<boolean>;

  canSendFriendRequest: (friendId: number) => Promise<boolean>;
  canCancelFriendRequest: (requestId: number) => Promise<boolean>;
  canDeclineFriendRequest: (requestId: number) => Promise<boolean>;
  canAcceptFriendRequest: (requestId: number) => Promise<boolean>;

  canDeleteFriend: (friendId: number) => Promise<boolean>;
}
