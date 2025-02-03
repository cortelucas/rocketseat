import { createServer } from "node:http";
import { randomUUID } from "node:crypto";

interface User {
  id: string;
  name: string;
  email: string;
}

const users: User[] = [];

const server = createServer((request, response) => {
  const { method, url } = request;
  console.log(method, url);

  if (method === "GET" && url === "/users") {
    return response
      .writeHead(200, {
        "Content-Type": "application/json",
      })
      .end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const newUser = {
      id: randomUUID(),
      name: "John Doe",
      email: "john.doe@example.com",
    };
    users.push(newUser);

    return response.writeHead(201, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message: `Usuário ${newUser.id} - ${newUser.name} criado com sucesso.`,
      })
    );
  }

  response.writeHead(200, { "Content-Type": "application/json" });
  return response.end(JSON.stringify({ message: "Hello World" }));
});

server.listen(3333, () => {
  console.log("Server is running");
});
