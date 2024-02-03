import Fastify, { FastifyInstance } from "fastify";
import expenseCategoryRoutes from "./routes/expenseCategoryRoutes";

export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({ logger: false });

  app.register(expenseCategoryRoutes);

  return app;
}
