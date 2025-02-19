import fastify from 'fastify'

const server = fastify({
	logger: true,
})

server
	.listen({
		port: 3000,
		host: '0.0.0.0',
	})
	.then(address => console.log(`Server listening on ${address}`))
