import { createServer } from "node:http";

const server = createServer((request, response) => {
  const { method, url } = request;
  console.log(method, url);

  if (method === "GET" && url === "/users") {
    response.writeHead(200, { "Content-Type": "application/json" });
    return response.end(JSON.stringify({ message: "Listagem de usuários" }));
  }

  if (method === "POST" && url === "/users") {
    response.writeHead(200, { "Content-Type": "application/json" });
    return response.end(JSON.stringify({ message: "Criação de usuários" }));
  }

  response.writeHead(200, { "Content-Type": "application/json" });
  return response.end(JSON.stringify({ message: "Hello World" }));
});

server.listen(3333, () => {
  console.log("Server is running");
});
