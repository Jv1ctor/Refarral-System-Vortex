import {
  UserRegisterSchema,
  UserRegisterSchemaType,
} from "../lib/schemas/UserRegisterSchema" 
import bcrypt from "bcrypt"
import { IUserRepository } from "../repository/UserRepository"
import { genCode } from "../helpers/genCode"
import { UserWithoutPassType } from "../types/UserWithoutPassType"
import { ReturnServiceType } from "../types/ReturnServiceType"
import {
  UserLoginSchema,
  UserLoginSchemaType,
} from "../lib/schemas/UserLoginSchema"
import JWT from "jsonwebtoken"

export class UserService {
  private saltsRound = process.env.SALTS_ROUNDS || 10

  constructor(private userRep: IUserRepository) {}

  public async register(
    data: UserRegisterSchemaType
  ): ReturnServiceType<UserWithoutPassType> {
    const {
      success,
      data: user,
      error,
    } = await UserRegisterSchema.safeParseAsync(data)

    if (!success)
      return {
        success: false,
        data: null,
        error: error.issues.reduce(
          (acc, item) => (acc += item.message + " e "),
          ""
        ),
      }

    const isExistEmail = await this.userRep.findByEmail(data.email)

    if (isExistEmail != null)
      return { success: false, data: null, error: "Email ja cadastrado" }

    const passHash = await bcrypt.hash(user.password, Number(this.saltsRound))
    const code = genCode()

    const result = await this.userRep.create({
      name: user.name,
      email: user.email,
      password: passHash,
      code,
    })

    return { success: true, data: result, error: null }
  }

  public async validCode(code: string): ReturnServiceType<{
    codeReferral: string
    score: number
  }> {
    const user = await this.userRep.findByCode(code)

    if (!user) return { success: false, data: null, error: "codigo invalido" }

    return { success: true, data: user, error: null }
  }

  public async assignScore(
    code: string,
    currentScore: number
  ): ReturnServiceType<{
    score: number
  }> {

    const newScore = currentScore + 1
    const user = await this.userRep.earnScore(code, newScore)

    if (!user) return { success: false, data: null, error: "codigo invalido" }

    return { success: true, data: user, error: null }
  }

  public async login(data: UserLoginSchemaType): ReturnServiceType<string> {
    const {
      success,
      data: user,
      error,
    } = await UserLoginSchema.safeParseAsync(data)

    if (!success)
      return {
        success: false,
        data: null,
        error: error.issues.reduce(
          (acc, item) => (acc += item.message + " e "),
          ""
        ),
      }

    const existUser = await this.userRep.findByEmail(data.email)

    if (existUser === null)
      return { success: false, data: null, error: "usuario não cadastrado" }

    const passCompare = await bcrypt.compare(user.password, existUser.password)

    if (!passCompare)
      return { success: false, data: null, error: "credenciais invalidas" }

    const token = JWT.sign(
      { id: existUser.id },
      process.env.SECRET_TOKEN as string,
      { expiresIn: "1d" }
    )

    return { success: true, data: token, error: null }
  }

  public async info(id: string): ReturnServiceType<UserWithoutPassType> {
    const user = await this.userRep.findById(id)

    if (!user)
      return {
        success: false,
        data: null,
        error: "falha ao recuperar os dados",
      }

    return {
      success: true,
      data: {
        codeReferral: user.codeReferral,
        email: user.email,
        name: user.name,
        score: user.score,
      },
      error: null,
    }
  }
}
