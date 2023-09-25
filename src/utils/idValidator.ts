import type { HydratedDocument } from "mongoose";
import { isObjectIdOrHexString } from "mongoose";
import Attraction from "../models/attraction/model";
import User from "../models/user/model";
import type { Attraction as AttractionType } from "../types/attraction";
import type { User as UserType } from "../types/user";
import { CustomValidationError } from "./errors";

export const getUser = async (
    userId: any
): Promise<HydratedDocument<UserType>> => {
    if (userId == null) throw new CustomValidationError("User ID required");

    if (!isObjectIdOrHexString(userId))
        throw new CustomValidationError(`Invalid user ID: ${userId}`);

    const user = await User.findById(userId);
    if (!user)
        throw new CustomValidationError(`Unknown user ID: ${userId}`, 404);

    return user;
};

export const getAttraction = async (
    attractionId: any
): Promise<HydratedDocument<AttractionType>> => {
    if (attractionId == null)
        throw new CustomValidationError("Attraction ID required");

    if (!isObjectIdOrHexString(attractionId))
        throw new CustomValidationError(
            `Invalid attraction ID: ${attractionId}`
        );

    const attraction = await Attraction.findById(attractionId);
    if (!attraction)
        throw new CustomValidationError(
            `Unknown attraction ID: ${attractionId}`,
            404
        );

    return attraction;
};
