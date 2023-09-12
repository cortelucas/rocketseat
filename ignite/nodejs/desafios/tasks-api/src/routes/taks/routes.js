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
  }
]
