import mongoose from "mongoose";
import type { WaitTimeData } from "../../types/waitTime";

const WaitTimeDataModel =
    mongoose.connection.collection<WaitTimeData>("waittimedatas");

export default WaitTimeDataModel;
