import { createServer } from "node:http"
import { randomUUID } from "node:crypto"
import { json } from "./middlewares/json.ts"
import { Database } from "./database.ts"

interface User {
  id: string
  name: string
  email: string
}

const database = new Database()

const server = createServer(async (request, response) => {
  const { method, url } = request

  await json(request, response)

  if (method === "GET" && url === "/users") {
    const users = database.select('users')
    return response
      .writeHead(200)
      .end(JSON.stringify(users))
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = request.body
    const user = {
      id: randomUUID(),
      name,
      email
    }
    database.insert('users', user)

    return response
      .writeHead(201)
      .end(
        JSON.stringify({
          message: `Usuário ${user.id} - ${user.name} criado com sucesso.`,
        })
      )
  }

  return response
    .writeHead(404)
    .end(JSON.stringify({ message: "Not Found" }))
})

server.listen(3333, () => {
  console.log("Server is running 🚀")
})
