import { Router } from "express";
import AttractionModel from "../models/attraction/model";
const AttractionsRouter = Router();

import WaitTimeDataModel from "../models/waitTimeData/model";
import * as idValidator from "../utils/idValidator";
import * as permissions from "../utils/permissions";

AttractionsRouter.get("/get", async (req, res) => {
    permissions.check(req, "attraction-get");
    const attractions = await AttractionModel.find({});
    return res.json(attractions);
});

AttractionsRouter.get("/get/:id", async (req, res) => {
    permissions.check(req, "attraction-get");
    const attraction = await idValidator.getAttraction(req.params.id);
    return res.json(attraction);
});

AttractionsRouter.get("/get-data", async (req, res) => {
    permissions.check(req, "attraction-get");
    const data = await WaitTimeDataModel.aggregate([
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
    ]).toArray();
    return res.json(data);
});

AttractionsRouter.get("/get-data/:id", async (req, res) => {
    permissions.check(req, "attraction-get");
    const attraction = await idValidator.getAttraction(req.params.id);
    const data = await WaitTimeDataModel.aggregate([
        {
            $match: {
                attractionId: attraction._id,
            }
        },
        {
            $lookup: {
                from: "attractions",
                localField: "attractionId",
                foreignField: "_id",
                as: "attraction",
            }
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
        }
    ]).toArray();
    return res.json(data[0]);
});

export default AttractionsRouter;
