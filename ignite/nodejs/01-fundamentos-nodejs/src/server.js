import { createServer } from 'node:http'

const server = createServer((request, response) => {
    return response.end('Olá!')
})

server.listen(3333, () => console.log('🚀 Server is running'))
