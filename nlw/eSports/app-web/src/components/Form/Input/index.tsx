import { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  htmlFor?: string
  label?: string
}

export function Input({ htmlFor, label, ...props}: InputProps) {
  return (
    <>
      <label htmlFor={ htmlFor } className="font-semibold">{ label }</label>
      <input
        {...props}
        className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
      />
    </>
  )
}
