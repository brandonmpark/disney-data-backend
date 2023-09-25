import type { Document } from "mongoose";

export interface LoginInfo {
    username: string;
    password: string;
}

export interface User {
    username: string;
    password: string;
    permissions: string[];
}

declare global {
    namespace Express {
        interface Request {
            user?: {
                permissions: string[];
                _id: string;
            }
        }
    }
}

export interface UserDocument extends User, Document {}
