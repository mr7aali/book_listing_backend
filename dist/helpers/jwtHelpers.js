"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createToken = (payload, secret, option) => {
    return jsonwebtoken_1.default.sign(payload, secret, option);
};
exports.createToken = createToken;
const verifyToken = (token, secret) => {
    try {
        const verifiedToken = jsonwebtoken_1.default.verify(token, secret);
        return verifiedToken;
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Invalid Token");
    }
};
exports.verifyToken = verifyToken;
