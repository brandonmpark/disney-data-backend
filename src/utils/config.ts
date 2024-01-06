export const PORT = 3000;

export const ENV = Bun.env.NODE_ENV ?? "development";

// eslint-disable-next-line import/no-mutable-exports
export let MONGODB_URI: string;
switch (Bun.env.NODE_ENV) {
    case "test":
        MONGODB_URI = Bun.env.TEST_MONGODB_URI ?? "";
        break;
    case "development":
        MONGODB_URI = Bun.env.DEVELOPMENT_MONGODB_URI ?? "";
        break;
    case "production":
        MONGODB_URI = Bun.env.PRODUCTION_MONGODB_URI ?? "";
        break;
    default:
        MONGODB_URI = Bun.env.TEST_MONGODB_URI ?? "";
}

export const SECRET: string = Bun.env.SECRET ?? "secret";

export const AUTH = false;