import User from "../models/user/model";
import { UnauthorizedError } from "./errors";
import * as config from "./config";
import { Types } from "mongoose";
import { Request } from "express";

const defaultPermissions = ["user-get"];

export const grantDefault = async (userId: Types.ObjectId) => {
    await User.findByIdAndUpdate(userId, {
        $addToSet: { permissions: { $each: defaultPermissions } },
    });
};

export const grant = async (userId: Types.ObjectId, permissions: string[]) => {
    await User.findByIdAndUpdate(userId, {
        $addToSet: { permissions: { $each: permissions } },
    });
};

export const revoke = async (userId: Types.ObjectId, permissions: string[]) => {
    await User.findByIdAndUpdate(userId, {
        $pull: { permissions: { $in: permissions } },
    });
};

export const check = (req: Request, permission: string, selfAllowed = false) => {
    if (!config.AUTH) return true;
    if (!req.user) throw new UnauthorizedError(`Unauthorized`, 401);
    if (selfAllowed && req.user._id === req.params.id) return true;
    const permissions = req.user.permissions;
    if (permissions.includes("admin-admin")) return true;
    if (!permissions.includes(permission))
        throw new UnauthorizedError(`Missing permission: ${permission}`);
};