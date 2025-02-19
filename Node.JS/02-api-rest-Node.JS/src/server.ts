import fastify from 'fastify'
import { knex } from './database'

const server = fastify()

server.get('/health-check', async (request, reply) => {
	const tables = await knex('sqlite_schema').select('*')

	return tables
})

try {
	server
		.listen({
			port: 3000,
			host: '0.0.0.0',
		})
		.then(address => console.log(`Server listening on ${address}`))
} catch (error) {
	server.log.error(error)
	process.exit(1)
}
