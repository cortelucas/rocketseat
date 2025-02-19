import fastify from "fastify";

const server = fastify({
	logger: true,
});

server
	.listen({
		port: 3000,
		host: "0.0.0.0",
	})
	.then(() => console.log("Server running on http://localhost:3000"));
