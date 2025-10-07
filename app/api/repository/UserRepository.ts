import { prisma } from "../database"
import { UserCreateDataType } from "../types/UserCreateDataType"
import { UserType } from "../types/UserType"

export interface IUserRepository {
  create(user: UserCreateDataType): Promise<UserType>
  findByEmail(email: string): Promise<UserType | null>
}

class UserRepository implements IUserRepository{
  public async create(user: UserCreateDataType) {
    const result = await prisma.users.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        codeReferral: user.code,
      },
      omit: { password: true }
    })

    return result
  }

  public async findByEmail(email: string){
    const result = await prisma.users.findUnique({
      where: { email },
      omit: { password: true }
    })

    return result
  }
}


export default new UserRepository()