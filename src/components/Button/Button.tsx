import { FC } from "react"

interface Props {
  children: React.ReactNode,
  isLoading: boolean
}

const Button:FC<Props> = ({ children, isLoading }) => {
  return (
    <button
      className="bg-blue-500 border border-blue-500 text-white font-bold
      w-full rounded-md p-2 hover:bg-blue-600"
      type="submit"
    >
      {isLoading ? <p>Loading...</p> : children}
    </button>
  )
}

export default Button