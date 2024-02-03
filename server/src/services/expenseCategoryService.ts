import { ExpenseCategory, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ExpenseCategoryService {
  async getAll() {
    try {
      const expenseCategories = await prisma.expenseCategory.findMany();

      return expenseCategories;
    } catch (error) {
      throw new Error("Error fetching expense categories");
    }
  }

  async create(
    data: Omit<ExpenseCategory, "id">
  ): Promise<Omit<ExpenseCategory, "id">> {
    try {
      const createdExpenseCategory = await prisma.expenseCategory.create({
        data: {
          name: data.name,
          description: data.description,
        },
      });

      return createdExpenseCategory;
    } catch (error) {
      throw new Error("Failed to create expense category");
    }
  }
}
