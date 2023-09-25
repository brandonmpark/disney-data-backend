import http from "http";
import app from "./app";
const server = http.createServer(app);

import * as config from "./utils/config";
import * as logger from "./utils/logger";

server.listen(config.PORT, () => {
    logger.log(`Listening on port ${config.PORT}...`, { type: "b"});
});