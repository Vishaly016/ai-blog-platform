import express from "express";
import { registerUser, loginUser, toggleBookmark,
    getBookmarks, } from "../controllers/userController.js";
import userAuth from "../middleware/userAuth.js";

const userRouter = express.Router();

// Register a new user
userRouter.post("/register", registerUser);
// Login an existing user
userRouter.post("/login", loginUser); 

userRouter.post(
    "/bookmark/:blogId",
    userAuth,
    toggleBookmark
);

userRouter.get(
    "/bookmarks",
    userAuth,
    getBookmarks
);


export default userRouter;