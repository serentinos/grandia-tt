import { FC } from "react"

interface Props {
  children: React.ReactNode,
  isLoading: boolean,
  disabled?: boolean
}

const Button:FC<Props> = ({ children, isLoading, disabled }) => {
  return (
    <button
      className="bg-blue-500 border border-blue-500 text-white font-bold
      w-full rounded-md p-2 hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-300 disabled:border-blue-200"
      type="submit"
      disabled={disabled}
    >
      {isLoading ? <p>Loading...</p> : children}
    </button>
  )
}

export default Button