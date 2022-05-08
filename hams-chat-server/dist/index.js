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
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const apollo_server_core_1 = require("apollo-server-core");
const graphql_1 = require("./graphql");
const apollo_server_express_1 = require("apollo-server-express");
const graphql_redis_subscriptions_1 = require("graphql-redis-subscriptions");
const ioredis_1 = __importDefault(require("ioredis"));
const ws_1 = require("ws");
const http_1 = require("http");
const ws_2 = require("graphql-ws/lib/use/ws");
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient({ log: ['query', 'info', 'warn', 'error'] });
    const app = (0, express_1.default)();
    var whitelist = ['https://studio.apollographql.com', process.env.CORS_ORIGIN];
    var corsOptions = {
        origin: function (origin, callback) {
            console.log(origin);
            if (whitelist.indexOf(origin) !== -1) {
                callback(null, true);
            }
            else {
                callback(new Error('Not allowed by CORS'));
            }
        },
    };
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
        context: () => {
            return {
                prisma,
                pubsub,
            };
        },
    }, wsServer);
    const server = new apollo_server_express_1.ApolloServer({
        schema: graphql_1.schema,
        csrfPrevention: true,
        context: ({ req }) => {
            var _a, _b;
            const ctx = {
                name: null,
                refreshToken: null,
            };
            const cookies = ((_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.cookie) !== null && _b !== void 0 ? _b : '')
                .split(';')
                .reduce((obj, c) => {
                const [name, value] = c.split('=');
                obj[name.trim()] = value.trim();
                return obj;
            }, {});
            ctx.refreshToken = cookies === null || cookies === void 0 ? void 0 : cookies.refreshToken;
            try {
                if (req.headers['x-access-token']) {
                    const token = jwt.verify(req.headers['x-access-token'], JWT_SECRET);
                    ctx.name = token.data;
                }
            }
            catch (e) { }
            return ctx;
            return {
                prisma,
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