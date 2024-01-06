import type { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import type { HydratedDocument } from "mongoose";
import User from "../models/user";
import type { User as UserType } from "../types/user";
import * as config from "./config";

export const hash = (password: string) => Bun.password.hashSync(password);

export const compare = (password: string, encrypted: string) =>
    Bun.password.verifySync(password, encrypted);

export const generateToken = (user: HydratedDocument<UserType>) => {
    const userForToken = {
        username: user.username,
        id: user._id,
    };
    return jwt.sign(userForToken, config.SECRET);
};

export const extractToken = (req: Request) => {
    if (!req.headers || !req.headers.authorization) return null;
    const token = req.headers.authorization.split(" ")[1];
    return token;
};

export const getUserByToken = async (
    token: string | null
): Promise<HydratedDocument<UserType> | null> => {
    if (!token) return null;

    try {
        const decodedToken = jwt.verify(token, config.SECRET) as JwtPayload;
        const user = await User.findById(decodedToken.id);
        return user;
    } catch (e) {
        return null;
    }
};
