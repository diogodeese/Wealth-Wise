import { FastifyRequest, FastifyReply } from "fastify";
import { ExpenseCategoryService } from "../services/expenseCategoryService";

export class ExpenseCategoryController {
  private expenseCategoryService: ExpenseCategoryService;

  constructor() {
    this.expenseCategoryService = new ExpenseCategoryService();
  }

  async getAllExpenseCategories(req: FastifyRequest, res: FastifyReply) {
    try {
      const expenseCategories =
        await this.expenseCategoryService.getAllExpenseCategories();
      return res.send(expenseCategories);
    } catch (error) {
      console.error("Error fetching expense categories:", error);
      return res.status(500).send({ error: "Internal Server Error" });
    }
  }
}
