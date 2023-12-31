import { Router } from "express";
import Attraction from "../models/attraction";

import WaitTimeData from "../models/waitTimeData";
import * as idValidator from "../utils/idValidator";
import * as permissions from "../utils/permissions";

const AttractionsRouter = Router();

AttractionsRouter.get("/get", async (req, res) => {
    permissions.check(req, "attraction-get");
    const attractions = await Attraction.find({});
    return res.json(attractions);
});

AttractionsRouter.get("/get/:id", async (req, res) => {
    permissions.check(req, "attraction-get");
    const attraction = await idValidator.getAttraction(req.params.id);
    return res.json(attraction);
});

AttractionsRouter.get("/get-data", async (req, res) => {
    permissions.check(req, "attraction-get");
    const data = await WaitTimeData.aggregate([
        {
            $lookup: {
                from: "attractions",
                localField: "attractionId",
                foreignField: "_id",
                as: "attraction",
            },
        },
        {
            $unwind: "$attraction",
        },
        {
            $project: {
                attractionName: "$attraction.name",
                _id: 1,
                entries: 1,
            },
        },
    ]);
    return res.json(data);
});

AttractionsRouter.get("/get-data/:id", async (req, res) => {
    permissions.check(req, "attraction-get");
    const attraction = await idValidator.getAttraction(req.params.id);
    const data = await WaitTimeData.aggregate([
        {
            $match: {
                attractionId: attraction._id,
            },
        },
        {
            $lookup: {
                from: "attractions",
                localField: "attractionId",
                foreignField: "_id",
                as: "attraction",
            },
        },
        {
            $unwind: "$attraction",
        },
        {
            $project: {
                attractionName: "$attraction.name",
                _id: 1,
                entries: 1,
            },
        },
    ]);
    return res.json(data[0]);
});

export default AttractionsRouter;
