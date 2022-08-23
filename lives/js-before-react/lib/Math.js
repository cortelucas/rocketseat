export const Math = {
  add: (x, y) => x + y,
  sub: (x, y) => x - y,
  div: (x, y) => y === 0 ? 'ERRO! Divisão por zero' : x / y,
  mult: (x, y) => x * y
}

export const PI = Math.PI