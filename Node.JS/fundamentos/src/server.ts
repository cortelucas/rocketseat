import { createServer } from "node:http"
import { json } from "./middlewares/json.ts"
import { routes } from "./routes.ts"

interface User {
  id: string
  name: string
  email: string
}

const server = createServer(async (request, response) => {
  const { method, url } = request

  await json(request, response)

  const route = routes.find(route => {
    return route.method === method && route.path === url
  })

  if (route) {
    return route.handler(request, response)
  }

  return response
    .writeHead(404)
    .end(JSON.stringify({ message: "Not Found" }))
})

server.listen(3333, () => {
  console.log("Server is running 🚀")
})
