import { useRef, useState, type FormEvent } from "react"
import { Input } from "./Input"
import { Button } from "./Button"
import { useNavigate, useParams } from "react-router"
import type { RegisterResponse } from "../types/api/RegisterResponse"
import type { ErrorFormRegisterType } from "../types/ErrorFormType"
import { verifyErrorForm } from "../helpers/verifyErrorForm"

import {
  emailSchema,
  passSchema,
  nameSchema,
} from "../../../../packages/schemas/src/UserFormSchema"

export const FormRegister = () => {
  const { code } = useParams<{ code: string }>()

  const navigate = useNavigate()
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [pass, setPass] = useState("")
  const [errors, setErrors] = useState<ErrorFormRegisterType[]>([])

  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)

  const handleValid = ({
    email,
    pass,
    name,
  }: {
    email: string
    pass: string
    name: string
  }) => {
    const { success: successName } = nameSchema.safeParse(name)
    const { success: successEmail } = emailSchema.safeParse(email)
    const { success: successPass } = passSchema.safeParse(pass)

    let isFocus = false
    if (!successName) {
      if (!isFocus) emailRef.current?.focus()
      isFocus = true
      setErrors((prev) => [...prev, "name"])
    }
    if (!successEmail) {
      if (!isFocus) emailRef.current?.focus()
      isFocus = true
      setErrors((prev) => [...prev, "email"])
    }
    if (!successPass) {
      if (!isFocus) passRef.current?.focus()
      isFocus = true
      setErrors((prev) => [...prev, "pass"])
    }

    if (isFocus) return false

    return true
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formsValid = handleValid({ email, pass, name })
    if (!formsValid) return
    try {
      const response = await fetch(
        `http://localhost:3000/user/register?code=${code || ""}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password: pass }),
        }
      )

      const responseJson: RegisterResponse = await response.json()
      if (!response.ok || !responseJson.success) {
        setErrors([...errors, "request"])
        return
      }

      navigate("/login")
    } catch (error) {
      setErrors([...errors, "request"])
      console.error(error)
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      <Input
        required
        ref={nameRef}
        label="Nome"
        placeholder="Digite seu nome"
        id="name"
        type="name"
        value={name}
        message={
          verifyErrorForm<ErrorFormRegisterType>("name", errors)
            ? "Digite um nome valido"
            : ""
        }
        onChange={(e) => {
          setErrors([])
          setName(e.target.value)
        }}
      />

      <Input
        required
        ref={emailRef}
        label="Email"
        placeholder="Digite seu e-mail"
        id="email"
        type="email"
        value={email}
        message={
          verifyErrorForm<ErrorFormRegisterType>("email", errors)
            ? "Digite um email valido"
            : ""
        }
        onChange={(e) => {
          setErrors([])
          setEmail(e.target.value)
        }}
      />

      <Input
        required
        ref={passRef}
        label="Senha"
        placeholder="Digite sua senha"
        id="password"
        type="password"
        value={pass}
        message={
          verifyErrorForm<ErrorFormRegisterType>("pass", errors)
            ? "Digite sua senha com no minino 8 caracteres contendo letras e numeros"
            : ""
        }
        onChange={(e) => {
          setErrors([])
          setPass(e.target.value)
        }}
      />

      <Button label="Finallizar" />

      {verifyErrorForm<ErrorFormRegisterType>("request", errors) && (
        <span className="login-form__fail-message">
          Erro ao Realizar cadastro, por favor tente novamente.
        </span>
      )}
    </form>
  )
}
