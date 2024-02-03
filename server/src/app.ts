import Fastify, { FastifyInstance } from "fastify";
import expenseCategoryRoutes from "./routes/expenseCategoryRoutes";

export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({ logger: false });

  app.addHook("onRequest", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

  app.register(expenseCategoryRoutes);

  return app;
}
