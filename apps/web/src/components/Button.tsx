import "../styles/components/Button.css"

type Props = {
  label: string
}

export const Button = ({ label }: Props) => {
  return (
    <>
      <button className="btn btn--primary">{label}</button>
    </>
  )
}