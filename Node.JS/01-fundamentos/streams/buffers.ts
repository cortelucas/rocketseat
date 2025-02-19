// Buffer é uma representação de um espaço de memória

const buffer: Buffer = Buffer.from("Hello")

console.log("--- buffer ---")
console.log(buffer)

console.log("--- buffer.toString ---")
console.log(buffer.toString())

console.log("--- buffer.toJSON ---")
console.log(buffer.toJSON())
