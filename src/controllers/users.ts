import { Router } from "express";
import UserModel from "../models/user/model";

import validator from "../models/user/validator";
import * as auth from "../utils/auth";
import * as idValidator from "../utils/idValidator";
import * as permissions from "../utils/permissions";

const UsersRouter = Router();

UsersRouter.get("/get", async (req, res) => {
    permissions.check(req, "user-get");
    const users = await UserModel.find({});
    return res.json(users);
});

UsersRouter.get("/get/:id", async (req, res) => {
    permissions.check(req, "user-get", true);
    const user = await idValidator.getUser(req.params.id);
    return res.json(user);
});

UsersRouter.post("/register", async (req, res) => {
    const user = await validator.validate(req.body);
    const savedUser = await new UserModel(user).save();
    await permissions.grantDefault(savedUser._id);
    const token = auth.generateToken(savedUser);
    return res.status(201).json({ ...savedUser.toJSON(), token });
});

UsersRouter.post("/login", async (req, res) => {
    const user = await validator.validateLogin(req.body);
    const token = auth.generateToken(user);
    return res.json({ ...user, token });
});

UsersRouter.post("/grant-permissions/:id", async (req, res) => {
    permissions.check(req, "user-permissions");
    const user = await idValidator.getUser(req.params.id);
    await permissions.grant(user._id, req.body.permissions);
    return res.status(201).end();
});

UsersRouter.post("/revoke-permissions/:id", async (req, res) => {
    permissions.check(req, "user-permissions");
    const user = await idValidator.getUser(req.params.id);
    await permissions.revoke(user._id, req.body.permissions);
    return res.status(201).end();
});

UsersRouter.put("/edit/:id", async (req, res) => {
    permissions.check(req, "user-edit", true);
    const user = await idValidator.getUser(req.params.id);
    const newUser = await validator.validate({
        ...user.toObject(),
        ...req.body,
        permissions: user.permissions,
    });
    Object.assign(user, newUser);
    const savedUser = await user.save();
    return res.json(savedUser);
});

UsersRouter.delete("/delete/:id", async (req, res) => {
    permissions.check(req, "user-delete", true);
    const user = await idValidator.getUser(req.params.id);
    if (!user) return;

    await UserModel.findByIdAndRemove(user._id);
    res.status(204).end();
});

export default UsersRouter;
