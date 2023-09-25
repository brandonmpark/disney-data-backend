import * as auth from "./auth";
import { ENV } from "./config";
import * as logger from "./logger";
import type { Request, Response, NextFunction} from "express";
import { CustomValidationError, UnauthorizedError } from "./errors";

export const permissionsChecker = async (req: Request, _res: Response, next: NextFunction) => {
    const token = auth.extractToken(req);
    const user = await auth.getUserByToken(token);
    if (!user) return next();
    req.user = {
        permissions: user.permissions,
        _id: user._id.toString(),
    };
    next();
};

export const requestLogger = (req: Request, _res:Response, next: NextFunction) => {
    if (ENV === "development") {
        logger.log(`Method: ${req.method}`);
        logger.log(`Path: ${req.path}`);
        logger.log(`Body: ${req.body}`);
        logger.log("---");
    }

    next();
};

export const unknownEndpoint = (_req: Request, res: Response) => {
    res.status(404).send({ error: "Unknown endpoint" });
};

export const errorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) return next(err);

    if (err instanceof CustomValidationError)
        return res.status(err.status).send({ error: err.message });
    if (err instanceof UnauthorizedError)
        return res.status(err.status).send({ error: err.message });

    next(err);
};

export const unknownError = (err: Error, _req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) return next(err);
    logger.error(err.message);
    res.status(500).send({ error: "Unknown error" });
    return next(err);
};