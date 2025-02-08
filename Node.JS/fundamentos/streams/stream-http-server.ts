import { createServer } from "node:http"
import { InverseNumberStream } from "./fundamentals.ts"

// Request => Readable Stream
// Response = Writable Stream

const server = createServer((request, response) => {
  return request.pipe(new InverseNumberStream()).pipe(response)
})

server.listen(3334, () => console.log("Server is running 🚀"))
