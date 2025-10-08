import "../styles/pages/Home.css"
import { Header } from "../components/Header"
import { Button } from "../components/Button"
import { useLoaderData } from "react-router"
import type { UserData } from "../types/userData"
import { useState } from "react"

export const Home = () => {
  const [isClip, setIsClip] = useState(false)
  const { records } = useLoaderData() as { records: UserData }
  const url = `${window.location.origin}/${records.codeReferral}`

  const handleCopy = () => {
    navigator.clipboard.writeText(url)
      .then(() => {
        setIsClip(true)
      }).catch(err => {
        setIsClip(false)
        console.error(err)
      })
  }

  return (
    <div className="home">
      <Header />
      <div className="home-page">
        <div className="home-page__card">
          <div className="home-page__welcome">
            <h2 className="home-page__welcome-title">Olá, {records.name}!</h2>
            <p className="home-page__welcome-subtitle">
              Bem-vindo ao seu painel de indicações
            </p>
          </div>

          <div className="home-page__stats">
            <div className="home-page__stat-item">
              <span className="home-page__stat-label">Pontuação Atual</span>
              <span className="home-page__stat-value">{records.score}</span>
              <span className="home-page__stat-description">
                pontos acumulados
              </span>
            </div>
          </div>

          <div className="home-page__referral">
            <h3 className="home-page__referral-title">Seu Link de Indicação</h3>
            <p className="home-page__referral-description">
              Compartilhe este link com seus amigos e ganhe pontos a cada
              indicação!
            </p>

            <div className="home-page__referral-box">
              <input
                type="text"
                className={`home-page__referral-input ${isClip ? "home-page__referral-success" : "" }`}
                value={url}
                readOnly
              />

              <Button onClick={handleCopy} label="Copiar Link" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
