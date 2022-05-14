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
const jwks_rsa_1 = require("jwks-rsa");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (bearerToken) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new jwks_rsa_1.JwksClient({
        jwksUri: process.env.AUTH0_JWKS_URI,
    });
    function getJwksClientKey(header, callback) {
        client.getSigningKey(header.kid, (error, key) => {
            const signingKey = key.getPublicKey();
            callback(signingKey, null);
        });
    }
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default;
    });
});
//# sourceMappingURL=verify-token.js.map