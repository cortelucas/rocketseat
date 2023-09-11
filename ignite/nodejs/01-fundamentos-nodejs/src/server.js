import { randomUUID } from 'node:crypto'
import { createServer } from 'node:http'
import { json } from './middlewares/json.js'

const users = []

const server = createServer(async (request, response) => {
  const { method, url } = request

  await json(request, response)

  try {
    if (method === 'GET' && url === '/users') {
      return response
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(users))
    }
    if (method === 'POST' && url === '/users') {
      const { name, email } = request.body
      users.push({
        id: randomUUID(),
        name,
        email
      })

      return response
        .setHeader('Content-type', 'application/json')
        .writeHead(201)
        .end(JSON.stringify({
          message: `Usuário ${users[users.length - 1].id} criado com sucesso.`,
          user: users[users.length - 1]
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
