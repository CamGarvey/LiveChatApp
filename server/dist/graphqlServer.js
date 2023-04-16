"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGraphqlServer = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const apollo_server_express_1 = require("apollo-server-express");
const ws_1 = require("graphql-ws/lib/use/ws");
const graphql_1 = require("./graphql");
const prisma_1 = __importDefault(require("./lib/clients/prisma"));
const createGraphqlServer = ({ pubsub, auth, getUserIdFromToken, wsServer, httpServer, }) => {
    const serverCleanup = (0, ws_1.useServer)({
        schema: graphql_1.schema,
        context: (req) => {
            if (!(req === null || req === void 0 ? void 0 : req.connectionParams)) {
                throw new Error('Bad Request');
            }
            const token = req.connectionParams.Authorization;
            if (typeof token != 'string' || !token) {
                throw new apollo_server_core_1.ForbiddenError('No token');
            }
            const currentUserId = getUserIdFromToken(token);
            auth.currentUserId = currentUserId;
            return {
                currentUserId,
                prisma: prisma_1.default,
                pubsub,
                auth,
            };
        },
    }, wsServer);
    return new apollo_server_express_1.ApolloServer({
        schema: graphql_1.schema,
        csrfPrevention: true,
        context: ({ req }) => {
            const token = req.headers.authorization;
            if (!token) {
                throw new apollo_server_core_1.ForbiddenError('No token');
            }
            const currentUserId = getUserIdFromToken(token);
            if (!currentUserId) {
                throw new apollo_server_core_1.ForbiddenError('Invalid user');
            }
            auth.currentUserId = currentUserId;
            return {
                currentUserId,
                prisma: prisma_1.default,
                pubsub,
                auth,
            };
        },
        plugins: [
            (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
            {
                serverWillStart() {
                    return __awaiter(this, void 0, void 0, function* () {
                        return {
                            drainServer() {
                                return __awaiter(this, void 0, void 0, function* () {
                                    yield serverCleanup.dispose();
                                });
                            },
                        };
                    });
                },
            },
        ],
    });
};
exports.createGraphqlServer = createGraphqlServer;
//# sourceMappingURL=graphqlServer.js.map