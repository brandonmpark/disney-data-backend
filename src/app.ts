import express from "express";
import mongoose from "mongoose";
import "express-async-errors";
const app = express();

import * as config from "./utils/config";
import * as logger from "./utils/logger";

import cors from "cors";
import attractionsRouter from "./controllers/attractions";
import usersRouter from "./controllers/users";
import * as middleware from "./utils/middleware";

logger.log(`Starting service in ${config.ENV}...`, { type: "h1" });
logger.log(`Connecting to MongoDB...`, { type: "b" });

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.log("Connected to MongoDB!", { type: "b" });
    })
    .catch((error) => {
        logger.log("Failed to connect to MongoDB!", { type: "b" });
        logger.log(error, { type: "e" });
        process.exit(1);
    });

app.use(cors());
app.use(express.json());

app.use(middleware.permissionsChecker);
app.use(middleware.requestLogger);
app.use("/favicon.ico", express.static("assets/favicon.ico"));

app.use("/users", usersRouter);
app.use("/attractions", attractionsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
app.use(middleware.unknownError);

export default app;
