import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { env } from './env'
import { transactionsRoutes } from './routes'

const server = fastify()

server.register(cookie)

for (const route of [transactionsRoutes]) {
	server.register(route)
}

try {
	server
		.listen({
			port: env.HTTP_PORT,
			host: env.HTTP_HOST,
		})
		.then(address => console.log(`Server listening on ${address}`))
} catch (error) {
	server.log.error(error)
	process.exit(1)
}
