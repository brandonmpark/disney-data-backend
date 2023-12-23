import { Age, Status } from "../../types/attraction";
import { OperatingHours, Showtime } from "../../types/waitTime";

export const parseName = (nameText: string) =>
    nameText
        .trim()
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, " ");

export const parseArea = (areaText: string) =>
    areaText
        .trim()
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, " ");

export const parseHeightRequirement = (heightText: string) => {
    if (heightText === "Any Height") return 0;
    return parseInt(heightText.split(" ")[0], 10);
};

export const parseAges = (agesText: string): Age[] => {
    if (agesText === "All Ages") return Object.values(Age);
    return agesText.split("\n").map((age) => age.trim().toLowerCase()) as Age[];
};

export const parseTags = (tagsText: string) =>
    tagsText.split(",").map((tag) => tag.trim().toLowerCase());

export const toDecimal = (dateText: string) => {
    const date = new Date(dateText);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return hours + minutes / 60 === 0 ? 24 : hours + minutes / 60;
};

export const parseHours = (hours: OperatingHours): [number, number] =>
    hours.startTime && hours.endTime
        ? [toDecimal(hours.startTime), toDecimal(hours.endTime)]
        : [0, 0];

export const parseTimes = (times: Showtime[]): number[] =>
    times.map((time) => toDecimal(time.startTime));

export const parseStatus = (statusText: string): Status => {
    const statusMap: Record<string, Status> = {
        operating: Status.OPEN,
        refurbishment: Status.CLOSED_FOR_REFURBISHMENT,
        closed: Status.CLOSED,
        down: Status.CLOSED_TEMPORARILY,
    };
    return statusText.toLowerCase() in statusMap
        ? statusMap[statusText.toLowerCase()]
        : Status.CLOSED;
};
