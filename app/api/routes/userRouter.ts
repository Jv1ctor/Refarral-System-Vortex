import { Router } from "express";
import { UserController } from "../controllers/UserController";
import UserRepository from "../repository/UserRepository";
import { UserService } from "../services/UserService";

const userRouter = Router()

const userController = new UserController()

userRouter.post("/register", userController.register.bind(userController))


export default userRouter