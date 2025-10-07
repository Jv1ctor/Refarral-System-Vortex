import { BadRequestError } from "../errorsApi/BadRequestError"
import UserRepository from "../repository/UserRepository"
import { IUserService, UserService } from "../services/UserService"
import { Request, Response, NextFunction } from "express"

export class UserController {
  private userService: IUserService
  constructor() {
    this.userService = new UserService(UserRepository)
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    try {
    const { success, data, error } = await this.userService.register(req.body)

    if (!success) return next(new BadRequestError({ message: error }))
    
    return res.status(201).json({ success, data })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}
