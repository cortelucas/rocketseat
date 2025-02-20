import fastify from 'fastify'
import { knex } from './database'
import { env } from './env'

const server = fastify()

server.get('/hello', async (request, reply) => {
	const transactions = await knex('transactions').select('*')

	return transactions
})

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
