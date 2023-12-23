import { Park, Status } from "../../types/attraction";
import type {
    LabeledWaitTimeEntry,
    RawData,
    RawWaitTimeEntry,
    WaitTimeEntry,
} from "../../types/waitTime";
import * as parser from "./parser";

const DISNEYLAND_URL =
    "https://api.themeparks.wiki/v1/entity/7340550b-c14d-4def-80bb-acdb51d49a66/live";
const CALIFORNIA_ADVENTURE_URL =
    "https://api.themeparks.wiki/v1/entity/832fcd51-ea19-4e77-85c7-75d5843b127c/live";

const getUrl = (park: Park) =>
    park === Park.DISNEYLAND ? DISNEYLAND_URL : CALIFORNIA_ADVENTURE_URL;

const parseWaitTime = (
    waitTime: RawWaitTimeEntry
): Omit<WaitTimeEntry, "timestamp" | "weather"> => {
    const parsed: Omit<WaitTimeEntry, "timestamp" | "weather"> = {
        status: Status.CLOSED,
        waitTime: 0,
        todaysTimes: [],
        todaysHours: [],
    };

    parsed.status = parser.parseStatus(waitTime.status);

    if (waitTime?.queue?.STANDBY?.waitTime != null)
        parsed.waitTime = waitTime.queue.STANDBY.waitTime;

    if (waitTime?.operatingHours?.length)
        parsed.todaysHours = parser.parseHours(
            waitTime.operatingHours[0]
        );

    if (waitTime?.showtimes?.length)
        parsed.todaysTimes = parser.parseTimes(waitTime.showtimes);

    return parsed;
};

const get = async (
    park: Park
): Promise<Omit<LabeledWaitTimeEntry, "timestamp" | "weather">[]> => {
    const response = (await (
        await global.fetch(getUrl(park))
    ).json()) as RawData;

    const waitTimeData = response.liveData.map((attraction) => ({
        ...parseWaitTime(attraction),
        name: parser.parseName(attraction.name),
    }));

    return waitTimeData;
};

export default get;
