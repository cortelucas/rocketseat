import { type Knex, knex as setupKnex } from 'knex'
import { env } from './env'

export const config: Knex.Config = {
	client: env.DATABASE_CLIENT,
	connection:
		env.DATABASE_CLIENT === 'sqlite'
			? {
					filename: env.DATABASE_URL,
				}
			: {
					host: env.DATABASE_URL,
				},
	useNullAsDefault: true,
	migrations: {
		extension: 'ts',
		directory: 'database/migrations',
	},
}

export const knex = setupKnex(config)
