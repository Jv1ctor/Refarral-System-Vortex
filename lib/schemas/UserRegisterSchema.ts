import z from "zod"

export const UserRegisterSchema = z.object({
  name: z
    .string()
    .trim()
    .max(255, { error: "Nome ultrapassou a quantidade maxima de caracteres" }),
  email: z
    .email({ error: "Email invalido"})
    .trim()
    .max(255, { error: "Email ultrapassou a quantidade maxima de caracteres" }),
  password: z
    .string()
    .min(8, { error: "Senha precisa ter no minimo 8 caracteres" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
      error: "Senha necessita de pelo menos um numero e uma letra",
    }),
})


export type UserRegisterSchemaType = z.infer<typeof UserRegisterSchema>