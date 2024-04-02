import { Hono } from "hono";
import { OpenAPIHono, z } from "@hono/zod-openapi";
import { createRoute } from "@hono/zod-openapi";
import booksEndpoint from "./books";

const string_path = z.object({
  id: z
    .string()
    .min(3)
    .openapi({
      param: {
        name: "id",
        in: "path",
      },
      example: "123",
    }),
});

const number_path = z.object({
  id: z.number().openapi({
    param: {
      name: "id",
      in: "path",
    },
    example: 123,
  }),
});

const UserSchema = z.object({
  id: z.string().openapi({
    example: "123",
  }),
  name: z.string().openapi({
    example: "Stefano Rutishauser",
  }),
  age: z.number().openapi({
    example: 42,
  }),
});

const ErrorSchema = z.object({
  code: z.number().openapi({
    example: 400,
  }),
  message: z.string().openapi({
    example: "Bad Request",
  }),
});

const route = createRoute({
  method: "get",
  path: "/users/{id}",
  request: {
    params: string_path,
  },
  responses: {
    400: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Bad Request hash",
    },
    200: {
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
      description: "Get a user",
    },
  },
});

const app = new OpenAPIHono();

console.log(Bun.env.MOVIE_API);

app.openapi(
  route,
  (c) => {
    const context = c.req;
    console.log(context);
    console.log(context.param());
    const val = context.valid("param");
    console.log(val);

    // const { id } = c.req.valid("path");
    return c.json({
      id: "3",
      age: 20,
      name: "Ultra-man",
    });
  },
  (result, c) => {
    if (!result.success) {
      console.warn("Validation errors:", result.error.errors);
      return c.json(
        { errors: result.error.errors.map((err) => err.message) },
        400
      );
    }
  }
);

app.doc31("/doc", {
  openapi: "3.1.0",
  info: {
    version: "1.0.0",
    title: "Hone media api",
  },
});

app.route("/books", booksEndpoint);

export default app;
