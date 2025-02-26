import { randomUUID } from 'node:crypto'
import type { FastifyInstance } from 'fastify'
import z from 'zod'
import { knex } from '../database'
import { checkSessionIdExists } from '../middlewares'

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

		let sessionId = request.cookies.sessionId

		if (!sessionId) {
			sessionId = randomUUID()

			reply.cookie('sessionId', sessionId, {
				path: '/',
				maxAge: 60 * 60 * 24 * 7, // 7 days
			})
		}

		await knex('transactions').insert({
			id: randomUUID(),
			title,
			amount: type === 'credit' ? amount : amount * -1,
			session_id: sessionId,
		})

		return reply.status(201).send()
	})

	server.get(
		'/transactions',
		{ preHandler: [checkSessionIdExists] },
		async (request, reply) => {
			const { sessionId } = request.cookies

			const transactions = await knex('transactions')
				.where('session_id', sessionId)
				.select('*')

			return reply.status(200).send({ transactions })
		}
	)

	server.get(
		'/transactions/:id',
		{ preHandler: [checkSessionIdExists] },
		async (request, reply) => {
			const getTransactionParamsSchema = z.object({
				id: z.string().uuid(),
			})

			const { id } = getTransactionParamsSchema.parse(request.params)

			const { sessionId } = request.cookies

			const transaction = await knex('transactions')
				.select('*')
				.where({
					session_id: sessionId,
					id,
				})
				.first()

			return reply.status(200).send({ transaction })
		}
	)

	server.get(
		'/transactions/summary',
		{ preHandler: [checkSessionIdExists] },
		async (request, reply) => {
			const { sessionId } = request.cookies

			const summary = await knex('transactions')
				.where('session_id', sessionId)
				.sum('amount', { as: 'amount' })
				.first()

			return reply.status(200).send({ summary })
		}
	)
}
