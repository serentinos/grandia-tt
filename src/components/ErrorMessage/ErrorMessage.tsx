import { FC } from "react";

interface Props {
  children: React.ReactNode;
}

export const ErrorMessage:FC<Props> = ({ children }) => {
  return (
    <p 
      className="text-red-500 mb-2 p-2 w-full bg-red-100 border border-red-300 rounded-md"
    >
      {children}
    </p>
  )
}

export default ErrorMessage