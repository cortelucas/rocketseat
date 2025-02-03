import { createServer } from "node:http";

//converter código para typescript
const server = createServer((request, response) => {
  return response.end("Hello World!");
});

server.listen(3333, () => {
  console.log("Server is running");
});
