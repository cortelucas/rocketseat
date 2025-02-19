import { createServer } from "node:http"
import { json } from "./middlewares/json.ts"
import { routes } from "./routes.ts"
import { extractQueryParams } from "./utils/extract-query-params.ts"

const server = createServer(async (request, response) => {
  const { method, url } = request

  await json(request, response)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url ?? "/")
  })

  if (route) {
    const routeParams = request.url?.match(route.path)
    const { query, ...params } = routeParams?.groups ?? {}

    request.params = params
    request.query = query ? extractQueryParams(routeParams.groups.query) : {}
    
    return route.handler(request, response)
  }

  return response
    .writeHead(404)
    .end(JSON.stringify({ message: "Not Found" }))
})

server.listen(3333, () => {
  console.log("Server is running 🚀")
})
