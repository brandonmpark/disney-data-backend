import { Park } from "../../types/attraction";
import * as logger from "../../utils/logger";
import * as weather from "../weather";
import get from "./get";
import write from "./write";

const fetch = async () => {
    logger.log("Fetching wait times...", { type: "h1" });
    const timestamp = new Date();
    const weatherData = await weather.get();
    await Promise.all([
        get(Park.DISNEYLAND).then((waitTimeData) =>
            write(
                Park.DISNEYLAND,
                waitTimeData.map((waitTime) => ({
                    ...waitTime,
                    timestamp,
                    weather: weatherData,
                }))
            )
        ),
        get(Park.CALIFORNIA_ADVENTURE).then((waitTimeData) =>
            write(
                Park.CALIFORNIA_ADVENTURE,
                waitTimeData.map((waitTime) => ({
                    ...waitTime,
                    timestamp,
                    weather: weatherData,
                }))
            )
        ),
    ]);
};

export default fetch;
