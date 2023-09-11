import { FC } from "react"

interface Props {
  children: React.ReactNode
}

export const ResultData:FC<Props> = ({ children }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="bg-slate-100 border p-2 rounded-md">
        { children }
      </div>
    </div>
  )
}

export default ResultData