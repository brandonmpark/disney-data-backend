import type { HydratedDocument } from "mongoose";
import UserModel from ".";
import { CustomValidationError } from "../../types/errors";
import type { LoginInfo, User } from "../../types/user";
import * as auth from "../../utils/auth";

const validateUsername = async (username: any) => {
    if (!username || typeof username !== "string" || username.length < 3)
        throw new CustomValidationError(
            "Username must be a string with at least 3 characters"
        );

    if (/\s/g.test(username))
        throw new CustomValidationError("Username must not contain whitespace");

    if (
        await UserModel.exists({
            username: { $regex: `^${username}$`, $options: "i" },
        })
    )
        throw new CustomValidationError("Username already taken");

    return username;
};

const validatePassword = (password: any) => {
    if (!password || typeof password !== "string" || password.length < 6)
        throw new CustomValidationError(
            "Password must be a string with at least 6 characters"
        );

    return auth.hash(password);
};

const validatePermissions = (permissions: any): string[] => {
    if (permissions == null) return [];
    if (!Array.isArray(permissions))
        throw new CustomValidationError("Permissions must be an array");
    if (permissions.length === 0) return permissions;

    const seen = new Set();

    const validate = (permission: any) => {
        if (typeof permission !== "string")
            throw new CustomValidationError(
                `Invalid permission: ${permission}`
            );
        const match = permission.match(/^([a-z]+)-([a-z]+)$/);
        if (!match)
            throw new CustomValidationError(
                `Invalid permission: ${permission}`
            );
        if (seen.has(permission))
            throw new CustomValidationError(
                `Duplicate permission: ${permission}`
            );
        seen.add(permission);
        return permission;
    };

    return permissions.map(validate);
};

const validate = async (user: User): Promise<User> => ({
    username: await validateUsername(user.username),
    password: validatePassword(user.password),
    permissions: validatePermissions(user.permissions),
});

const validateLogin = async (
    user: LoginInfo
): Promise<HydratedDocument<User>> => {
    if (!user.username || typeof user.username !== "string")
        throw new CustomValidationError("Username required");
    if (!user.password || typeof user.password !== "string")
        throw new CustomValidationError("Password required");

    const foundUser = await UserModel.findOne({ username: user.username });
    if (!foundUser) throw new CustomValidationError("Unknown username", 404);

    if (!auth.compare(user.password, foundUser.password))
        throw new CustomValidationError("Invalid password");

    return foundUser;
};

export default {
    validateUsername,
    validatePassword,
    validate,
    validateLogin,
};
