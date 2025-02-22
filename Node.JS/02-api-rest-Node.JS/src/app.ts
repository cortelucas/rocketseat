import cookie from '@fastify/cookie'
import fastify from 'fastify'
import { transactionsRoutes } from './routes'

export const server = fastify()

server.register(cookie)

for (const route of [transactionsRoutes]) {
	server.register(route)
}
