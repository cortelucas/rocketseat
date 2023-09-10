import { randomUUID } from 'node:crypto'
import { createServer } from 'node:http'

const users = []

const server = createServer((request, response) => {
  const { method, url } = request
  try {
    if (method === 'GET' && url === '/users') {
      return response
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(users))
    }
    if (method === 'POST' && url === '/users') {
      users.push({
        id: randomUUID(),
        name: 'John Doe',
        email: 'john.doe@gmail.com'
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
    throw new Error(`ERROR: ${error}`)
  }
})

server.listen(3333, () => console.log('🚀 Server is running on http://localhost:3333'))
