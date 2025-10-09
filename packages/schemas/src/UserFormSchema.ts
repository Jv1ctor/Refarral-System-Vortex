import { UserLoginSchema } from "./UserLoginSchema.js";
import { UserRegisterSchema } from "./UserRegisterSchema.js";


export const emailSchema = UserLoginSchema.shape["email"]
export const passSchema = UserLoginSchema.shape["password"]
export const nameSchema = UserRegisterSchema.shape["name"]