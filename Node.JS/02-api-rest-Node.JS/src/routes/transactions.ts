import type { FastifyInstance } from 'fastify'
import { knex } from '../database'
import z from 'zod'
import { randomUUID } from 'node:crypto'

export async function transactionsRoutes(server: FastifyInstance) {
	server.post('/transactions', async (request, reply) => {
		const createTransactionBodySchema = z.object({
			title: z.string(),
			amount: z.number(),
			type: z.enum(['credit', 'debit']),
		})

		const { title, amount, type } = createTransactionBodySchema.parse(
			request.body
		)

		await knex('transactions').insert({
			id: randomUUID(),
			title,
			amount: type === 'credit' ? amount : amount * -1,
		})

		return reply.status(201).send()
	})

	server.get('/transactions', async (request, reply) => {
		const transactions = await knex('transactions').select('*')

		return reply.status(200).send(transactions)
	})
}
