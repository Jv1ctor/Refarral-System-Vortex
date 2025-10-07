import { Router } from "express";
import { UserController } from "../controllers/UserController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const userRouter = Router()

const userController = new UserController()

userRouter.post("/register", userController.register)
userRouter.post("/login", userController.login)
userRouter.get("/info", AuthMiddleware.handle, userController.info)


export default userRouter