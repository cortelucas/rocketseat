interface ButtonProps {
  title: string
}

function Button({ title }: ButtonProps) {
  return <button>{title}</button>
}

export function App () {
  return (
    <div>
      <Button title="E" />
      <Button title="O" />
      <Button title="Vento" />
      <Button title="Levou" />
    </div>
  )
}
