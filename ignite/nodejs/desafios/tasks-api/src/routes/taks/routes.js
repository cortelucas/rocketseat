import { randomUUID } from 'node:crypto'
import { Database } from '../../infra/db.js'
import { buildRoutePath } from '../../utils/build-route-path.js'

const db = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query

      const tasks = db.select('tasks', search
        ? {
            title: search,
            description: search
          }
        : null)

      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (request, response) => {
      const { title, description } = request.body
      const task = {
        id: randomUUID(),
        title,
        description,
        completedAt: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      db.insert('tasks', task)

      return response
        .writeHead(201)
        .end(JSON.stringify({
          message: `Tarefa ${task.id} criada com sucesso.`,
          task
        }))
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (request, response) => {
      const { id } = request.params
      const { title, description } = request.body

      if (!title && !description) {
        return response
          .writeHead(400)
          .end(JSON.stringify({
            message: 'Title ou description são obrigatórios.'
          }))
      }

      const [task] = db.select('tasks', { id })

      if (!task) {
        return response
          .writeHead(404)
          .end('ERROR: Resource is not found.')
      }

      db.update('tasks', id, {
        title: title || task.title,
        description: description || task.description,
        completedAt: null,
        createdAt: task.createdAt,
        updatedAt: new Date().toISOString()
      })

      return response
        .writeHead(201)
        .end(JSON.stringify({
          message: `Tarefa ${id} atualizada com sucesso.`
        }))
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (request, response) => {
      const { id } = request.params

      db.delete('tasks', id)

      return response
        .writeHead(200)
        .end(JSON.stringify({
          message: `Tarefa ${id} excluída com sucesso.`
        }))
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (request, response) => {
      const { id } = request.params

      const [task] = db.select('tasks', { id })

      if (!task) {
        return response
          .writeHead(404)
          .end('ERROR: Resource is not found.')
      }

      db.update('tasks', id, {
        updatedAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      })

      return response
        .writeHead(200)
        .end(JSON.stringify({
          message: `Tarefa ${id} concluída com sucesso.`
        }))
    }
  }
]
