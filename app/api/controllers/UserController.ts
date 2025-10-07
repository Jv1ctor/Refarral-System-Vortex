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

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const code = req.query.code as string
      const { success, data, error } = await this.userService.register(req.body)

      if (!success) return next(new BadRequestError({ message: error }))
      
      if(code){
        const { success: successValidCode, data: user, error: errorValidCode } = await this.userService.validCode(code)

        if(!successValidCode) return next(new BadRequestError({ message: errorValidCode }))
        
        const { success: successAssignScore , data, error: errorAssignScore } = await this.userService.assignScore(user.codeReferral, user.score)

        if(!successAssignScore) return next(new BadRequestError({ message: errorAssignScore }))
      }
    

      return res.status(201).json({ success, data })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { success, data, error } = await this.userService.login(req.body)

      if (!success) return next(new UnauthorizedError({ message: error }))

      return res.status(200).json({ success, data })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  public info = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const { success, data, error } = await this.userService.info(
        res.locals.user.id
      )

      if (!success) return next(new BadRequestError({ message: error }))

      return res.status(200).json({ success, data })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}
