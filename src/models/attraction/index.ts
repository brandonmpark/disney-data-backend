/* eslint-disable no-param-reassign */
import mongoose from "mongoose";
import type { Attraction } from "../../types/attraction";
import { Age, Park, Status, Type } from "../../types/attraction";

const attractionSchema = new mongoose.Schema<Attraction>({
    name: { type: String, required: true },
    actualName: { type: String, required: true },
    type: { type: String, required: true, enum: Object.keys(Type) },
    park: { type: String, required: true, enum: Object.keys(Park) },
    area: { type: String, required: true },
    heightRequirement: { type: Number, min: 0 },
    ages: [{ type: String, enum: Object.keys(Age) }],
    tags: { type: [String], required: true },
    seasonal: Boolean,
    variant: Boolean,
    todaysHours: [Number, Number],
    todaysTimes: { type: [Number], required: true },
    waitTime: { type: Number, required: true, min: 0 },
    status: { type: String, required: true, enum: Object.keys(Status) },
    waitTimeLastUpdated: { type: Date, required: true },
});

attractionSchema.set("toJSON", {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();

        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

export default mongoose.model<Attraction>("Attraction", attractionSchema);
