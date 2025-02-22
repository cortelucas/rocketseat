import { server } from './app'
import { env } from './env'

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
