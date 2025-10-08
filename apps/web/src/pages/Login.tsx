import { FormLogin } from "../components/FormLogin"
import "../styles/pages/Login.css"

export const Login = () => {
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card__header">
          <h1 className="login-card__title">Bem-vindo</h1>
          <p className="login-card__subtitle">Faça login para continuar</p>
        </div>

        <FormLogin/>

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
