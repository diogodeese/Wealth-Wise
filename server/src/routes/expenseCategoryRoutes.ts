import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { ExpenseCategoryController } from "../controllers/expenseCategoryController";

export default async function expenseCategoryRoutes(fastify: FastifyInstance) {
  const expenseCategoryController = new ExpenseCategoryController();

  fastify.get(
    "/expense-categories",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return expenseCategoryController.getAll(request, reply);
    }
  );

  fastify.post(
    "/expense-categories",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return expenseCategoryController.create(request, reply);
    }
  );
}
