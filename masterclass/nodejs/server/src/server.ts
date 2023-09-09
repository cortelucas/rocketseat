import cors from '@fastify/cors'
import Fastify from 'fastify'
import { memoriesRoutes } from './routes/memories'

const server = Fastify()

void server.register(cors, {
  origin: true
})
void server.register(memoriesRoutes)

try {
  void server
    .listen({ port: 3333 })
    .then(() => { console.log('🚀 Server running on http://localhost:3333') })
} catch (err) {
  server.log.error(err)
  process.exit(1)
}
