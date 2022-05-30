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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const apollo_server_core_1 = require("apollo-server-core");
const apollo_server_express_1 = require("apollo-server-express");
const graphql_redis_subscriptions_1 = require("graphql-redis-subscriptions");
const ioredis_1 = __importDefault(require("ioredis"));
const ws_1 = require("ws");
const http_1 = require("http");
const ws_2 = require("graphql-ws/lib/use/ws");
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("./routes/auth"));
const graphql_1 = require("./graphql");
const prisma_1 = __importDefault(require("./lib/clients/prisma"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use('/auth', auth_1.default);
    var corsOptions = {
        origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
        credentials: true,
    };
    app.use((0, cors_1.default)(corsOptions));
    app.use('/grahpql/*', (0, express_oauth2_jwt_bearer_1.auth)({
        audience: process.env.AUTH0_AUDIENCE,
        jwksUri: process.env.AUTH0_JWKS_URI,
        tokenSigningAlg: process.env.AUTH0_SIGNING_ALG,
        issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    }));
    const httpServer = (0, http_1.createServer)(app);
    const pubsubOptions = {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
        retryStrategy: (times) => {
            return Math.min(times * 50, 2000);
        },
    };
    const pubsub = new graphql_redis_subscriptions_1.RedisPubSub({
        publisher: new ioredis_1.default(pubsubOptions),
        subscriber: new ioredis_1.default(pubsubOptions),
    });
    const wsServer = new ws_1.WebSocketServer({
        server: httpServer,
        path: '/graphql',
    });
    const serverCleanup = (0, ws_2.useServer)({
        schema: graphql_1.schema,
        context: (req) => {
            console.log(req.connectionParams.Authorization);
            if (!req.connectionParams.Authorization) {
                throw new apollo_server_core_1.ForbiddenError('No token');
            }
            const token = req.connectionParams.Authorization.toString().replace('Bearer ', '');
            const decoded = jsonwebtoken_1.default.decode(token);
            const payload = JSON.parse(JSON.stringify(decoded));
            const userId = payload[process.env.DOMAIN + '/user_id'];
            return {
                userId,
                prisma: prisma_1.default,
                pubsub,
            };
        },
    }, wsServer);
    const server = new apollo_server_express_1.ApolloServer({
        schema: graphql_1.schema,
        csrfPrevention: true,
        context: ({ req }) => {
            const token = req.headers.authorization.replace('Bearer ', '');
            const decoded = jsonwebtoken_1.default.decode(token);
            const payload = JSON.parse(JSON.stringify(decoded));
            const userId = payload[process.env.DOMAIN + '/user_id'];
            return {
                userId,
                prisma: prisma_1.default,
                pubsub,
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
    yield server.start();
    server.applyMiddleware({
        app,
        cors: true,
    });
    const port = parseInt(process.env.PORT);
    httpServer.listen(port, () => {
        console.log(`Server is now running on http://localhost:${port}${server.graphqlPath}`);
    });
});
main().catch(console.error);
//# sourceMappingURL=index.js.map