import { log } from 'node:console'
import { createServer } from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes/taks/routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

const PORT = 3333

const server = createServer(async (request, response) => {
  const { method, url } = request

  await json(request, response)

  const route = routes.find(route => route.method === method && route.path.test(url))

  if (route) {
    const routeParams = request.url.match(route.path)
    const { query, ...params } = routeParams.groups

    request.params = params
    request.query = query ? extractQueryParams(query) : {}

    return route.handler(request, response)
  } else {
    return response
      .writeHead(404)
      .end('ERROR: Resource is not found.')
  }
})

server.listen(PORT, () => log(`🚀 Server running on http://localhost:${PORT}`))
