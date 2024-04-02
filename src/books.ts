import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";

const BookSchema = z.object({
  isbn: z.string().openapi({
    examples: [
      "978-0-45103-800-5",
      "978-0-4510-3800-5",
      "978-0-451-03800-5",
      "978-0451038005",
    ],
  }),
});

const str_query = z.object({
  input: z
    .string()
    .optional()
    .openapi({
      param: {
        name: "input",
        in: "query",
      },
    }),
});

const getBooks = createRoute({
  method: "get",
  path: "/",
  request: {
    query: str_query,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: BookSchema,
        },
      },
      description: "Get books",
    },
  },
});

const app = new OpenAPIHono();
app.openapi(getBooks, (c) => c.json({ isbn: "123-123" }));

export default app;
