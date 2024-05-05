import express from "express";
import UserController from "../controller/user.controller.js";
import jwtAuth from "../middleware/jwt.middleware.js";
// import passport from "passport";

const userRouter = express.Router();

// create controller intance
const userController = new UserController();

userRouter.get("/home", jwtAuth, (req, res) => {
  userController.getHome(req, res);
});

userRouter.post("/signup", (req, res) => {
  userController.signup(req, res);
});

userRouter.post("/signin", (req, res) => {
  userController.signIn(req, res);
});

userRouter.get("/signout", jwtAuth, (req, res) => {
  userController.signOut(req, res);
});

export default userRouter;
