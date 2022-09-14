import { PrismaClient } from '@prisma/client'
import express, { Request, Response } from 'express'
import cors from 'cors'
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes'
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string'

const server = express()

server.use(express.json())
server.use(cors())

const prisma = new PrismaClient({
  log: ['query']
})

server.get('/games', async (request: Request, response: Response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  })

  return response.json(games)
})



server.listen(3333, () => console.log('Server is running in port 3333'))
