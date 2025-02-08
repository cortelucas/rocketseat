import { createServer } from "node:http"
import { InverseNumberStream } from "./fundamentals.ts"

// Request => Readable Stream
// Response = Writable Stream

const server = createServer(async (request, response) => {
  const buffers: Buffer[] = []

  for await (const chunk of request) {
    buffers.push(chunk)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()
  console.log(fullStreamContent)

  return response.end(fullStreamContent)

  // return request.pipe(new InverseNumberStream()).pipe(response)
})

server.listen(3334, () => console.log("Server is running 🚀"))
