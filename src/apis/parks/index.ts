import { CronJob } from "cron";
import * as logger from "../../utils/logger";
import fetch from "./fetch";

const pollWaitTimes = () => {
    const job = new CronJob("*/5 6-23 * * *", async () => {
        try {
            await fetch();
        } catch (error) {
            logger.error("Error fetching metadata");
            if (error instanceof Error) logger.error(error.message);
        }
    });

    job.start();
};

export default pollWaitTimes;
