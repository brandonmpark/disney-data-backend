import mongoose from "mongoose";
import type { User } from "../../types/user";

const userSchema = new mongoose.Schema<User>(
    {
        username: { type: String, required: true, unique: true, minlength: 3 },
        password: { type: String, required: true },
        permissions: { type: [String], required: true },
    },
    { timestamps: true }
);

userSchema.set("toJSON", {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        returnedObject.createdAt = returnedObject.createdAt.toString();
        returnedObject.updatedAt = returnedObject.updatedAt.toString();

        delete returnedObject._id;
        delete returnedObject.__v;

        delete returnedObject.password;
    },
});

export default mongoose.model("User", userSchema);
