import "./button.css"
type Props = {
    callback: ()=>void
    text: string
    color?: string
}

const Button = (props: Props) => {
    const { callback, text, color } = props
  return (
    <button style={{backgroundColor:`${color ? color : ""}`}} onClick={callback}>
        {text}
    </button>
  )
}

export default Button