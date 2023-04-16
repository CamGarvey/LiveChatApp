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
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
const graphql_redis_subscriptions_1 = require("graphql-redis-subscriptions");
const http_1 = require("http");
const ioredis_1 = __importDefault(require("ioredis"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const hashids_1 = __importDefault(require("hashids"));
const ws_1 = require("ws");
const body_parser_1 = __importDefault(require("body-parser"));
const express4_1 = require("@apollo/server/express4");
const ws_2 = require("graphql-ws/lib/use/ws");
const graphql_1 = require("graphql");
const server_1 = require("@apollo/server");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const authorizer_1 = require("./lib/authorizer");
const prisma_1 = __importDefault(require("./lib/clients/prisma"));
const auth_1 = __importDefault(require("./routes/auth"));
const graphql_2 = require("./graphql");
const hash = new hashids_1.default(process.env.HASH_SALT, parseInt(process.env.HASH_MIN_LENGTH));
const getUserIdFromToken = (token) => {
    const strippedToken = token.replace('Bearer ', '');
    const decoded = jsonwebtoken_1.default.decode(strippedToken);
    const payload = JSON.parse(JSON.stringify(decoded));
    let [userId] = hash.decode(payload[process.env.DOMAIN + '/user_id']);
    return Number(userId);
};
const createWebSocket = ({ server, createContext, }) => {
    const wsServer = new ws_1.WebSocketServer({
        server,
        path: '/graphql',
    });
    return (0, ws_2.useServer)({
        schema: graphql_2.schema,
        context: (req) => {
            var _a;
            const token = (_a = req === null || req === void 0 ? void 0 : req.connectionParams) === null || _a === void 0 ? void 0 : _a.Authorization;
            if (typeof token != 'string' || !token) {
                throw new graphql_1.GraphQLError('No token');
            }
            return createContext(token);
        },
    }, wsServer);
};
const redisOptions = {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    retryStrategy: (times) => {
        return Math.min(times * 50, 2000);
    },
};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const pubsub = new graphql_redis_subscriptions_1.RedisPubSub({
        publisher: new ioredis_1.default(redisOptions),
        subscriber: new ioredis_1.default(redisOptions),
    });
    const authorizer = new authorizer_1.Authorizer(prisma_1.default);
    const createContext = (token) => {
        const currentUserId = getUserIdFromToken(token);
        if (!currentUserId) {
            throw new graphql_1.GraphQLError('No user');
        }
        authorizer.currentUserId = currentUserId;
        return {
            currentUserId,
            prisma: prisma_1.default,
            pubsub,
            auth: authorizer,
        };
    };
    const app = (0, express_1.default)();
    const httpServer = (0, http_1.createServer)(app);
    const wsServerCleanUp = createWebSocket({
        server: httpServer,
        createContext,
    });
    const server = new server_1.ApolloServer({
        schema: graphql_2.schema,
        csrfPrevention: true,
        introspection: true,
        plugins: [
            (0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
            {
                serverWillStart() {
                    return __awaiter(this, void 0, void 0, function* () {
                        return {
                            drainServer() {
                                return __awaiter(this, void 0, void 0, function* () {
                                    yield wsServerCleanUp.dispose();
                                });
                            },
                        };
                    });
                },
            },
        ],
    });
    yield server.start();
    app
        .use(express_1.default.json())
        .use('/auth', auth_1.default)
        .use((0, cors_1.default)({
        origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
        credentials: true,
    }))
        .use('/graphql', (0, cors_1.default)(), body_parser_1.default.json(), (0, express4_1.expressMiddleware)(server, {
        context: ({ req }) => __awaiter(void 0, void 0, void 0, function* () {
            const token = req.headers.authorization;
            if (!token) {
                throw new graphql_1.GraphQLError('No token');
            }
            return createContext(token);
        }),
    }), (0, express_oauth2_jwt_bearer_1.auth)({
        audience: process.env.AUTH0_AUDIENCE,
        jwksUri: process.env.AUTH0_JWKS_URI,
        tokenSigningAlg: process.env.AUTH0_SIGNING_ALG,
        issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    }));
    const port = parseInt(process.env.PORT);
    yield new Promise((resolve) => httpServer.listen({ port }, resolve));
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
});
main().catch(console.error);
//# sourceMappingURL=index.js.map