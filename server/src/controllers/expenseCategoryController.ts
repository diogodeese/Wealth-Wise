import { FastifyRequest, FastifyReply } from "fastify";
import { ExpenseCategoryService } from "../services/expenseCategoryService";
import { ExpenseCategory } from "@prisma/client";

export class ExpenseCategoryController {
  private expenseCategoryService: ExpenseCategoryService;

  constructor() {
    this.expenseCategoryService = new ExpenseCategoryService();
  }

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const expenseCategories = await this.expenseCategoryService.getAll();
      return reply.send(expenseCategories);
    } catch (error) {
      console.error("Error fetching expense categories:", error);
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, description }: ExpenseCategory =
        request.body as ExpenseCategory;
      const newCategory = await this.expenseCategoryService.create({
        name,
        description,
      });
      return reply.status(201).send(newCategory);
    } catch (error) {
      console.error("Error creating expense category:", error);
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}
