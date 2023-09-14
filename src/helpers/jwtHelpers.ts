import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import ApiError from "../errors/ApiError";
import httpStatus from "http-status";

export const createToken = (
    payload: Object,
    secret: Secret,
    option: Object
): string => {
    return jwt.sign(payload, secret, option);
}


export const verifyToken = (token: string, secret: Secret) => {
    try {
        const verifiedToken = jwt.verify(token, secret) as JwtPayload;
        return verifiedToken;
    } catch (err) {
        throw new ApiError(httpStatus.FORBIDDEN, "Invalid Token")
    }
}