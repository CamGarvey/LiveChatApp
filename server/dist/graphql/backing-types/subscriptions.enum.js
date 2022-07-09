"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = void 0;
var Subscription;
(function (Subscription) {
    Subscription["ChatUpdated"] = "chat.updated";
    Subscription["ChatCreated"] = "chat.created";
    Subscription["ChatDeleted"] = "chat.deleted";
    Subscription["ChatMembersDeleted"] = "chat.members.deleted";
    Subscription["ChatMembersAdded"] = "chat.members.added";
    Subscription["MessageCreated"] = "message.created";
    Subscription["MessageUpdated"] = "message.updated";
    Subscription["MessageDeleted"] = "message.deleted";
    Subscription["UserFriendRequestSent"] = "user.friend.request.sent";
    Subscription["UserFriendRequestReceived"] = "user.friend.request.received";
    Subscription["UserFriendRequestDeleted"] = "user.friend.request.canceled";
    Subscription["UserFriendCreated"] = "user.friend.created";
    Subscription["UserFriendDeleted"] = "user.friend.deleted";
    Subscription["UserChatCreated"] = "user.chat.created";
})(Subscription = exports.Subscription || (exports.Subscription = {}));
//# sourceMappingURL=subscriptions.enum.js.map