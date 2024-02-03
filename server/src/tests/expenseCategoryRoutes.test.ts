import { buildApp } from "../app";
import { FastifyInstance } from "fastify";

describe("Expense Category Routes", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should return all expense categories", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/expense-categories",
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toBeDefined();
    expect(Array.isArray(response.json())).toBe(true);
  });
});
