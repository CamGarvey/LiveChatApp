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
const prisma_1 = __importDefault(require("../lib/clients/prisma"));
const authRouter = express_1.default.Router();
authRouter.use((req, res, next) => {
    const { secret } = req.body;
    if (secret == process.env.AUTH0_HOOK_SECRET) {
        next();
    }
    else {
        res.sendStatus(403);
    }
});
authRouter.post('/create-user-hook', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        const user = yield prisma_1.default.user.create({
            data: {
                name,
                email,
            },
        });
        res.status(201).send({
            userId: user.id,
        });
    }
    catch (e) {
        res.status(500).send({
            reason: e,
        });
    }
}));
exports.default = authRouter;
//# sourceMappingURL=auth.js.map