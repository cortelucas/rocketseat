import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { json } from "./middlewares/json.ts"

interface User {
  id: string;
  name: string;
  email: string;
}

const users: User[] = [];

const server = createServer(async (request, response) => {
  const { method, url } = request;

  await json(request, response)

  if (method === "GET" && url === "/users") {
    return response
      .writeHead(200)
      .end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = request.body
    const newUser = {
      id: randomUUID(),
      name,
      email
    };
    users.push(newUser);

    return response
      .writeHead(201)
      .end(
        JSON.stringify({
          message: `Usuário ${newUser.id} - ${newUser.name} criado com sucesso.`,
        })
      );
  }

  return response
    .writeHead(404)
    .end(JSON.stringify({ message: "Not Found" }));
});

server.listen(3333, () => {
  console.log("Server is running 🚀");
});
