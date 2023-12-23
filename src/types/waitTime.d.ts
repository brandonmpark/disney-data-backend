import mongoose from "mongoose";
import { Status } from "./attraction";

export interface Weather {
    temperature: number;
    conditions: number;
}

export interface WaitTimeEntry {
    timestamp: Date;
    weather: Weather;
    status: Status;
    waitTime: number;
    todaysHours: [number, number] | [];
    todaysTimes: number[];
}

export interface LabeledWaitTimeEntry extends WaitTimeEntry {
    name: string;
}

export interface WaitTimeData {
    attractionId: mongoose.Types.ObjectId;
    entries: WaitTimeEntry[];
}

export interface OperatingHours {
    type: "Operating" | string;
    startTime: string;
    endTime: string;
}

export interface Showtime {
    startTime: string;
    endTime: string;
}

export interface RawWaitTimeEntry {
    name: string;
    status: "OPERATING" | "DOWN" | "CLOSED" | "REFURBISHMENT";
    queue?: {
        STANDBY?: {
            waitTime: number | null;
        };
    };
    operatingHours?: OperatingHours[];
    showtimes?: Showtime[];
}

export interface RawData {
    liveData: RawWaitTimeEntry[];
}
