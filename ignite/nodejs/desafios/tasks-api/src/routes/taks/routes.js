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
  }
]
