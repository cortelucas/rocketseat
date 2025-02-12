import { randomUUID } from "node:crypto";
import { Database } from "./database.ts";
import { buildRoutePath } from "./utils/build-route-path.ts";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/users"),
    handler: (request, response) => {
      const users = database.select("users");

      return response.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/users"),
    handler: (request, response) => {
      const { name, email } = request.body;
      const user = {
        id: randomUUID(),
        name,
        email,
      };
      database.insert("users", user);

      return response.writeHead(201).end(
        JSON.stringify({
          message: `Usuário ${user.id} - ${user.name} criado com sucesso.`,
        })
      );
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/users/:id"),
    handler: (request, response) => {
      const { id } = request.params;

      return response.writeHead(204).end();
    },
  }
];
