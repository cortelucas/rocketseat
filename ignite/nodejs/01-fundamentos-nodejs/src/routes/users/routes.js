import { randomUUID } from 'node:crypto'
import { Database } from '../../infra/db.js'

const db = new Database()

export const routes = [
  {
    method: 'GET',
    path: '/users',
    handler: (request, response) => {
      const users = db.select('users')
      return response
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path: '/users',
    handler: (request, response) => {
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
  }
]
