import type { ButtonHTMLAttributes } from "react"
import "../styles/components/Button.css"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
}

export const Button = (props: Props) => {
  return (
    <>
      <button className="btn btn--primary" {...props}>{props.label}</button>
    </>
  )
}