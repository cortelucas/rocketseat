import { type FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export const memoriesRoutes = async (server: FastifyInstance) => {
  server.get('/memories', async (request, reply) => {
    try {
      const memories = await prisma.memory.findMany({
        orderBy: {
          createdAt: 'asc'
        }
      })

      return memories.map(memory => {
        return {
          id: memory.id,
          coverURL: memory.coverURL,
          excerpt: memory.content.length >= 115 ? memory.content.substring(0, 115).concat('...') : memory.content
        }
      })
    } catch (err) {
      throw new Error(`ERROR: ${err}`)
    }
  })

  server.get('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = paramsSchema.parse(request.params)
    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id
      }
    })

    return memory
  })

  server.post('/memories', async (request, reply) => {
    const bodySchema = z.object({
      content: z.string(),
      coverURL: z.string(),
      isPublic: z.coerce.boolean().default(false)
    })

    const { content, coverURL, isPublic } = bodySchema.parse(request.body)

    const memory = prisma.memory.create({
      data: {
        content,
        coverURL,
        isPublic,
        userId: '5db63a12-c14a-4668-8d94-958ebfe69381'
      }
    })

    return {
      message: 'Memória criada com sucesso',
      memory
    }
  })

  server.put('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid()
    })
    const bodySchema = z.object({
      content: z.string(),
      coverURL: z.string(),
      isPublic: z.coerce.boolean().default(false)
    })

    const { id } = paramsSchema.parse(request.params)
    const { content, coverURL, isPublic } = bodySchema.parse(request.body)

    const memory = await prisma.memory.update({
      where: {
        id
      },
      data: {
        content,
        coverURL,
        isPublic
      }
    })

    return {
      message: 'Memória atualizada com sucesso.',
      memory
    }
  })

  server.delete('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = paramsSchema.parse(request.params)

    await prisma.memory.delete({
      where: {
        id
      }
    })

    return {
      message: `Memória do ${id} excluída com sucesso.`
    }
  })
}
