import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ExpenseCategoryService {
  async getAllExpenseCategories() {
    try {
      const expenseCategories = await prisma.expenseCategory.findMany();
      return expenseCategories;
    } catch (error) {
      throw new Error("Error fetching expense categories");
    }
  }
}
