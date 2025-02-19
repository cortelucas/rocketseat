import fastify from 'fastify'
import { knex } from './database'
import { randomUUID } from 'node:crypto'

const server = fastify()

server.get('/hello', async (request, reply) => {
	const transactions = await knex('transactions').select('*')

	return transactions
})

try {
	server
		.listen({
			port: 3333,
			host: '0.0.0.0',
		})
		.then(address => console.log(`Server listening on ${address}`))
} catch (error) {
	server.log.error(error)
	process.exit(1)
}
