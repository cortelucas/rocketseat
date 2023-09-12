import { createServer } from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes/users/routes.js'

const server = createServer(async (request, response) => {
  const { method, url } = request

  await json(request, response)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = request.url.match(route.path)
    request.params = { ...routeParams.groups }
    route.handler(request, response)
  } else {
    return response
      .writeHead(404)
      .end('Not Found!')
  }
})

server.listen(3333, () => console.log('🚀 Server is running on http://localhost:3333'))
