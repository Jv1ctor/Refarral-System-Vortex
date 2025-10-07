import { BadRequestError } from "../errorsApi/BadRequestError"
import { UnauthorizedError } from "../errorsApi/UnauthorizedError"
import UserRepository from "../repository/UserRepository"
import { UserService } from "../services/UserService"
import { Request, Response, NextFunction } from "express"

export class UserController {
  private userService: UserService
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

  public async login(req: Request, res: Response, next: NextFunction){
    try {
      const { success, data, error } = await this.userService.login(req.body)

      if(!success) return next(new UnauthorizedError({ message: error }))

      return res.status(200).json({ success, data })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}
