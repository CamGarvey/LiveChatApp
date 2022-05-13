// Queries

export * from './queries/user.query';
export * from './queries/channel.query';
export * from './queries/message.query';

// Mutations

export * from './mutations/createUser.mutation';
export * from './mutations/createChannel.mutation';
export * from './mutations/createMessage.mutation';

export * from './mutations/deleteUser.mutation';
export * from './mutations/deleteChannel.mutation';
export * from './mutations/deleteMessage.mutation';

export * from './mutations/updateUser.mutation';
export * from './mutations/updateChannel.mutation';
export * from './mutations/updateMessage.mutation';

export * from './mutations/sendFriendRequest.mutation';
export * from './mutations/acceptFriendRequest.mutation';
export * from './mutations/deleteFriendRequest.mutation';

export * from './mutations/deleteFriend.mutation';

// Subscriptions

export * from './subscriptions/message.subscription';
export * from './subscriptions/user.subscription';
