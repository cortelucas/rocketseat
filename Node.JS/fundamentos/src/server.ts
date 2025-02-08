import { createServer } from "node:http";
import { randomUUID } from "node:crypto";

interface User {
  id: string;
  name: string;
  email: string;
}

const users: User[] = [];

const server = createServer(async (request, response) => {
  const buffers: Buffer[] = [];
  for await (const chunk of request) {
    buffers.push(chunk);
  }

  try {
    request.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    request.body = null;
  }

  const { method, url } = request;

  if (method === "GET" && url === "/users") {
    return response
      .writeHead(200, {
        "Content-Type": "application/json",
      })
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

    return response.writeHead(201, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        message: `Usuário ${newUser.id} - ${newUser.name} criado com sucesso.`,
      })
    );
  }

  return response
    .writeHead(404, { "Content-Type": "application/json" })
    .end(JSON.stringify({ message: "Not Found" }));
});

server.listen(3333, () => {
  console.log("Server is running 🚀");
});
