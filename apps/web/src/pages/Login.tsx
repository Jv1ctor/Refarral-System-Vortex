import { Button } from "../components/Button"
import { Input } from "../components/Input"
import "../styles/pages/Login.css"

export const Login = () => {
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card__header">
          <h1 className="login-card__title">Bem-vindo</h1>
          <p className="login-card__subtitle">Faça login para continuar</p>
        </div>

        <form className="login-form">
          <Input
            isRequired={true}
            label="Email"
            placeholder="Digite seu e-mail"
            id="email"
            type="email"
          />

          <Input
            isRequired={true}
            label="Senha"
            placeholder="Digite sua senha"
            id="password"
            type="password"
          />

          <Button label="Entrar"/>
        </form>

        <div className="login-card__footer">
          <p className="login-card__footer-text">
            Não tem uma conta?{" "}
            <a href="#" className="login-card__footer-link">
              Cadastre-se
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
