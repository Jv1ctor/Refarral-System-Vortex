import z from "zod"

export const UserSchema = z.object({
  name: z
    .string()
    .max(255, { error: "Nome ultrapassou a quantidade maxima de caracteres" }),
  email: z
    .email()
    .max(255, { error: "Email ultrapassou a quantidade maxima de caracteres" }),
  password: z
    .string()
    .min(8, { error: "Senha precisa ter no minimo 8 caracteres" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
      error: "Senha necessita e pelo menos um numero e uma letra",
    }),
})


export type UserSchemaType = z.infer<typeof UserSchema>