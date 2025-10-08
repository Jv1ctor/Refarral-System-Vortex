
import { FormRegister } from "../components/FormRegister"
import "../styles/pages/Login.css"

export const Register = () => {

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card__header">
          <h1 className="login-card__title">Realize seu cadastro</h1>
          <p className="login-card__subtitle">Insira suas informações para continuar</p>
        </div>

        <FormRegister/>

        <div className="login-card__footer">
          <p className="login-card__footer-text">
            Já tem uma conta?{" "}
            <a href="#" className="login-card__footer-link">
              Log-in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}