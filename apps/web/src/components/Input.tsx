import "../styles/components/Input.css"

type Props = {
  label: string,
  id: string,
  placeholder: string,
  isRequired: boolean,
  type: "email" | "password" | "text"
}

export const Input = ({ label, placeholder, isRequired, type, id}: Props) => {
  return (
    <div className="field-container">
      <label htmlFor={id} className="field-container__label">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="field-container__input"
        placeholder={placeholder}
        required={isRequired}
      />
    </div>
  )
}
