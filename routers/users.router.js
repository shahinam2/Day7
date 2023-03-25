import express from "express";
import {
    addUser,
    deleteUser,
    getUser,
    login,
    updateUser,
} from "../controllers/users.controller.js";
export const userRouter = express.Router();

userRouter.route("/")
    .post(addUser);

userRouter.route("/:uid")
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

userRouter.route("/login").post(login);
