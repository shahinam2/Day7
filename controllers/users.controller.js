import { db } from "../server.js";
import createError from "http-errors";

/* -------------------------------- REGISTER -------------------------------- */
export const addUser = async (req, res, next) => {
    try {
        const newUser = {
            ...req.body,
            id: db.data.users.slice(-1)[0]?.id + 1 || 1,
        };
        //check required fields
        if (!newUser.username || !newUser.password) {
            return next(createError(400, "required fields are missed! 🚨"));
        }

        //add newUser to array of users in db
        db.data.users.push(newUser);
        await db.write();
        //remove password from newUser for security
        delete newUser.password;
        res.status(200).json({
            message: "successful regsiter! ✅",
            user: newUser,
        });
    } catch (err) {
        next(err);
    }
};

/* --------------------------------- PROFILE -------------------------------- */
export const getUser = async (req, res, next) => {
    try {
        const userid = parseInt(req.params.uid);

        //check if uid is valid
        if (isNaN(userid)) {
            // return res
            //     .status(400)
            //     .json({ message: "userid in url is not valid. 🚨" });
            return next(createError(400, "userid in url is not valid. 🚨"));
        }

        //find user with given uid
        const user = db.data.users.find((u) => u.id === userid);
        if (!user) {
            // return res
            //     .status(404)
            //     .json({ message: "There is no user with given userid. 🚨" });
            return next(
                createError(404, "There is no user with given userid. 🚨")
            );
        }

        res.status(200).json({ message: "user fetched! ✅", user: user });
    } catch (err) {
        next(err);
    }
};

/* ----------------------------- UPDATE PROFILE ----------------------------- */
export const updateUser = async (req, res, next) => {
    try {
        const userid = parseInt(req.params.uid);

        //check if uid is valid
        if (isNaN(userid)) {
            // return res
            //     .status(400)
            //     .json({ message: "userid in url is not valid. 🚨" });
            return next(createError(400, "userid in url is not valid. 🚨"));
        }

        //find user with given uid
        const userIndex = db.data.users.findIndex((u) => u.id === userid);
        if (userIndex === -1) {
            // return res
            //     .status(404)
            //     .json({ message: "There is no user with given userid. 🚨" });
            return next(
                createError(404, "There is no user with given userid. 🚨")
            );
        }

        //update user
        db.data.users[userIndex] = { ...db.data.users[userIndex], ...req.body };
        await db.write();
        res.status(200).json({
            message: "successful update! ✅",
            user: db.data.users[userIndex],
        });
    } catch (err) {
        next(err);
    }
};

/* ----------------------------- DELETE PROFILE ----------------------------- */
export const deleteUser = async (req, res, next) => {
    try {
        const userid = parseInt(req.params.uid);
        //check if uid is valid
        if (isNaN(userid)) {
            // return res
            //     .status(400)
            //     .json({ message: "userid in url is not valid. 🚨" });
            return next(createError(400, "userid in url is not valid. 🚨"));
        }

        //find user with given uid
        const userIndex = db.data.users.findIndex((u) => u.id === userid);
        if (userIndex === -1) {
            // return res
            //     .status(404)
            //     .json({ message: "There is no user with given userid. 🚨" });
            return next(
                createError(404, "There is no user with given userid. 🚨")
            );
        }
        //delete user from array users
        db.data.users.splice(userIndex, 1);
        await db.write();
        res.status(200).json({ message: "User deleted! ✅" });
    } catch (err) {
        next(err);
    }
};

/* ---------------------------------- LOGIN --------------------------------- */
export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            // return res
            //     .status(400)
            //     .json({ message: "Please provide username and password! 🚨" });
            return next(
                createError(400, "Please provide username and password! 🚨")
            );
        }

        const user = db.data.users.find(
            (u) => u.username === username && u.password === password
        );
        if (!user) {
            // return res
            //     .status(404)
            //     .json({ message: "There is no user with given credentials. 🚨" });
            return next(
                createError(404, "There is no user with given credentials. 🚨")
            );
        }
        delete user.password;
        res.status(200).json({ message: "login success! ✅", user: user });
    } catch (err) {
        next(err);
    }
};
