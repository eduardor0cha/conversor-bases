import classNames from "classnames"
import { ButtonHTMLAttributes } from "react"

function Button({ className, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={classNames("c-button", className)} {...rest} />
  )
}

export default Button