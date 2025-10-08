import { useRef, useState, type FormEvent } from "react"
import { Input } from "./Input"
import { Button } from "./Button"
import type { LoginResponse } from "../types/api/LoginResponse"
import { useNavigate } from "react-router"

export const FormLogin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>("")
  const [pass, setPass] = useState("")
  const [error, setError] = useState<"email" | "pass" | "all" | null>(null)

  const emailRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password: pass})
      })

      const responseJson: LoginResponse = await response.json()
      if(!response.ok || !responseJson.success){
        setError("all")
        return
      }
      localStorage.setItem("token", responseJson.data)
      navigate("/")
    } catch (error) {
      setError("all")
      console.error(error)
    }
  }

  const handleInvalid = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault()

    if(!email || email.indexOf("@") ){
      emailRef.current?.focus()
      setError("email")
    } 
    if(!pass){
      passRef.current?.focus()
      setError("pass")
    } 

    if(!email && !pass){
       emailRef.current?.focus()
       setError("all")
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
        message={ error === "email" || error === "all" ? "Digite um email valido" : ""}
        onChange={(e) => {
          setError(null)
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
        message={error === "pass" || error === "all" ? "Digite uma senha valida" : ""}
        onChange={(e) => {
          setError(null)
          setPass(e.target.value)
        }}
        onInvalid={handleInvalid}
      />

      <Button label="Entrar" />
    </form>
  )
}
