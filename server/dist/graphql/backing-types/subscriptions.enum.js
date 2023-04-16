"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = void 0;
var Subscription;
(function (Subscription) {
    Subscription["ChatCreated"] = "chat.created";
    Subscription["EventCreated"] = "event.created";
    Subscription["EventUpdated"] = "event.updated";
    Subscription["EventDeleted"] = "event.deleted";
    Subscription["RequestSent"] = "notification.request.sent";
    Subscription["RequestCancelled"] = "notification.request.cancelled";
    Subscription["RequestAcceptedAlert"] = "notification.alert.request.accepted";
    Subscription["RequestDeclinedAlert"] = "notification.alert.request.declined";
    Subscription["FriendDeletedAlert"] = "notification.alert.friend.deleted";
    Subscription["ChatDeletedAlert"] = "notification.alert.chat.deleted";
    Subscription["ChatUpdatedAlert"] = "notification.alert.chat.updated";
    Subscription["ChatMemberAccessRevokedAlert"] = "notification.alert.chat.access.member.revoked";
    Subscription["ChatMemberAccessGrantedAlert"] = "notification.alert.chat.access.member.granted";
    Subscription["ChatAdminAccessRevokedAlert"] = "notification.alert.chat.access.admin.revoked";
    Subscription["ChatAdminAccessGrantedAlert"] = "notification.alert.chat.access.admin.granted";
})(Subscription = exports.Subscription || (exports.Subscription = {}));
//# sourceMappingURL=subscriptions.enum.js.map