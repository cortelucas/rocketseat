import { randomUUID } from 'node:crypto'
import { createServer } from 'node:http'
import { Database } from './infra/db.js'
import { json } from './middlewares/json.js'

const db = new Database()

const server = createServer(async (request, response) => {
  const { method, url } = request

  await json(request, response)

  try {
    if (method === 'GET' && url === '/users') {
      const users = db.select('users')
      return response
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(users))
    }
    if (method === 'POST' && url === '/users') {
      const { name, email } = request.body
      const user = {
        id: randomUUID(),
        name,
        email
      }

      db.insert('users', user)

      return response
        .setHeader('Content-type', 'application/json')
        .writeHead(201)
        .end(JSON.stringify({
          message: `Usuário ${user.id} criado com sucesso.`,
          user
        }))
    }
    return response
      .writeHead(404)
      .end('Not Found!')
  } catch (error) {
    console.error(`ERROR: ${new Error(error)}`)
  }
})

server.listen(3333, () => console.log('🚀 Server is running on http://localhost:3333'))
