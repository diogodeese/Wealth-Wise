import api from "@/lib/axios";
import { z } from "zod";

const ExpenseCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

type ExpenseCategoryResponse = z.input<typeof ExpenseCategorySchema>;

export async function getExpenseCategories(): Promise<
  ExpenseCategoryResponse[]
> {
  return await api.get("/expense-categories");
}
