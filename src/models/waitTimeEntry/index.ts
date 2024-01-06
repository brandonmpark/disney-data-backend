/* eslint-disable import/prefer-default-export */
import mongoose from "mongoose";
import { Status } from "../../types/attraction";
import type { WaitTimeEntry } from "../../types/waitTime";

export const waitTimeEntrySchema = new mongoose.Schema<WaitTimeEntry>({
    timestamp: {
        type: Date,
        required: true,
    },
    weather: {
        temperature: {
            type: Number,
            required: true,
        },
        conditions: {
            type: String,
            required: true,
        },
    },
    status: {
        type: String,
        required: true,
        enum: Object.keys(Status),
    },
    waitTime: {
        type: Number,
        required: true,
        min: 0,
    },
    todaysHours: {
        type: [Number],
        validate: {
            validator: (v: number[]) => v.length === 0 || v.length === 2,
            message: (props) =>
                `todaysHours array length must be either 0 or 2, but got length ${props.value.length}`,
        },
        required: true,
    },
    todaysTimes: {
        type: [Number],
        required: true,
    },
});
