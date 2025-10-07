import { NextFunction, Request, Response } from "express"
import JWT, { JwtPayload } from "jsonwebtoken"
import { UnauthorizedError } from "../errorsApi/UnauthorizedError"

class AuthMiddleware {
  private validatorAuth = (auth?: string) => {
    if (auth) {
      const [authCode, token] = auth.split(" ")

      return {
        authCode: authCode === "Bearer" && authCode,
        token,
      }
    }
  }

  public handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const auth = this.validatorAuth(req.headers.authorization)

      if (auth && auth.authCode && auth.token) {
        const verify = JWT.verify(
          auth.token,
          process.env.SECRET_TOKEN as string
        )

        if (verify) {
          const decoded = JWT.decode(auth.token) as JwtPayload & { id: string }

          res.locals.user = { id: decoded.id }
          next()
          return
        }
      }

      return next(
        new UnauthorizedError({
          message: "invalid token",
        })
      )
    } catch (error) {
      console.log(error)
      return next(
        new UnauthorizedError({
          message: "invalid token",
        })
      )
    }
  }
}

export default new AuthMiddleware()
