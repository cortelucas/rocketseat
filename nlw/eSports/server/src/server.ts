import express, { Request, Response } from 'express'

const server = express()

server.get('/ads', (request: Request, response: Response) => {
  return response.json([
    { id: 1, name: 'Anúncio 1' },
    { id: 2, name: 'Anúncio 2' },
    { id: 3, name: 'Anúncio 3' },
    { id: 4, name: 'Anúncio 4' }
  ])
})

server.listen(3333, () => console.log('Server is running in port 3333'))