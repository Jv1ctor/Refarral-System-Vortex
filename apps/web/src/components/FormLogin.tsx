import { useRef, useState, type FormEvent } from "react"
import { Input } from "./Input"
import { Button } from "./Button"
import type { LoginResponse } from "../types/api/LoginResponse"
import { useNavigate } from "react-router"
import type { ErrorFormLoginType } from "../types/ErrorFormType"
import { verifyErrorForm } from "../helpers/verifyErrorForm"

export const FormLogin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>("")
  const [pass, setPass] = useState("")
  const [errors, setErrors] = useState<ErrorFormLoginType[]>([])

  const emailRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: pass }),
      })

      const responseJson: LoginResponse = await response.json()
      if (!response.ok || !responseJson.success) {
        setErrors(["email", "pass"])
        return
      }
      localStorage.setItem("token", responseJson.data)
      navigate("/")
    } catch (error) {
      setErrors(["email", "pass"])
      console.error(error)
    }
  }

  const handleInvalid = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    let isFocus = false
    if (!email || email.indexOf("@") === -1) {
      if (!isFocus) emailRef.current?.focus()
      isFocus = true
      setErrors((prev) => [...prev, "email"])
    }
    if (!pass) {
      if (!isFocus) passRef.current?.focus()
      isFocus = true
      setErrors((prev) => [...prev, "pass"])
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <Input
        required
        ref={emailRef}
        label="Email"
        placeholder="Digite seu e-mail"
        id="email"
        type="email"
        value={email}
        message={
          verifyErrorForm<ErrorFormLoginType>("email", errors) ? "Digite um email valido" : ""
        }
        onChange={(e) => {
          setErrors([])
          setEmail(e.target.value)
        }}
        onInvalid={handleInvalid}
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
          verifyErrorForm<ErrorFormLoginType>("pass", errors)? "Digite uma senha valida" : ""
        }
        onChange={(e) => {
          setErrors([])
          setPass(e.target.value)
        }}
        onInvalid={handleInvalid}
      />

      <Button label="Entrar" />
    </form>
  )
}
