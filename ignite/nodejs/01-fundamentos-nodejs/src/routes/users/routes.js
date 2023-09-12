import { randomUUID } from 'node:crypto'
import { Database } from '../../infra/db.js'
import { buildRoutePath } from '../../ultils/build-route-path.js'

const db = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (request, response) => {
      const users = db.select('users')
      return response
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
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
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (request, response) => {
      const { id } = request.params

      db.delete('users', id)

      return response
        .writeHead(200)
        .end(JSON.stringify({
          message: `Usuário ${id} excluído com sucesso.`
        }))
    }
  }
]
