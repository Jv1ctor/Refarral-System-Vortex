import { prisma } from "../database"
import { UserCreateDataType } from "../types/UserCreateDataType"
import { UserWithoutPassType } from "../types/UserWithoutPassType"
import { UserType } from "../types/UserType"

export interface IUserRepository {
  create(user: UserCreateDataType): Promise<UserWithoutPassType>
  findByEmail(email: string): Promise<UserType | null>
  findById(id: string): Promise<UserWithoutPassType | null>
  findByCode(code: string): Promise<{ codeReferral: string, score: number} | null>
  earnScore(code: string, currentScore: number): Promise<{ score: number }>
}

class UserRepository implements IUserRepository {
  public async create(user: UserCreateDataType) {
    const result = await prisma.users.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        codeReferral: user.code,
      },
      omit: { password: true },
    })

    return result
  }

  public async findByEmail(email: string) {
    const result = await prisma.users.findUnique({
      where: { email },
    })

    return result
  }

  public async findById(id: string) {
    return await prisma.users.findUnique({
      where: { id },
      omit: { password: true },
    })
  }

  public async findByCode(code: string ){
    return await prisma.users.findUnique({
      where: { codeReferral: code },
      select: { codeReferral: true, score: true },
    }) 
  }

  public async earnScore(code: string, currentScore: number) {
    return await prisma.users.update({
      where: { codeReferral: code },
      data: { score: currentScore },
      select: { score: true }
    })
  }
}

export default new UserRepository()
