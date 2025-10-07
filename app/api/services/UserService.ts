import { UserSchema, UserSchemaType } from "../../../lib/schemas/UserSchema"
import bcrypt from "bcrypt"
import { IUserRepository } from "../repository/UserRepository"
import { genCode } from "../helpers/genCode"
import { UserType } from "../types/UserType"
import { ReturnServiceType } from "../types/ReturnServiceType"

export interface IUserService {
  register(data: UserSchemaType): ReturnServiceType<UserType>
}

export class UserService implements IUserService{
  private saltsRound = process.env.SALTS_ROUNDS || 10

  constructor(private userRep: IUserRepository) {}

  public async register(data: UserSchemaType): ReturnServiceType<UserType> {

    const { success, data: user, error } = await UserSchema.safeParseAsync(data)
    
    if (!success)
      return { success: false, data: null, error: error.message }

    const isExistEmail = await this.userRep.findByEmail(data.email)

    if(isExistEmail != null)
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
}
