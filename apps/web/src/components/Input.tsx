import { type InputHTMLAttributes, type Ref } from "react"
import "../styles/components/Input.css"

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  message?: string
  ref?: Ref<HTMLInputElement>
}

export const Input = (props: Props) => {
  return (
    <div className="field-container">
      <label htmlFor={props.id} className="field-container__label">
        {props.label}
      </label>
      <input {...props} ref={props.ref} className="field-container__input" />

      <p className={props.message && "field-container__error-text"}>
        {props.message}
      </p>
    </div>
  )
}
