import { Combobox } from "@/app/components/ui/combobox";
import { useQuery } from "@tanstack/react-query";
import { getExpenseCategories } from "@/api/get-expense-categories";
import Layout from "@/app/components/layout";
import Expenses from "@/app/expenses/page";

export default function App() {
  const { data } = useQuery({
    queryKey: ["expense-categories"],
    queryFn: getExpenseCategories,
  });

  const comboboxData = data?.map((expenseCategory) => ({
    id: expenseCategory.id,
    text: expenseCategory.name,
  }));

  return (
    <Layout>
      <Combobox label="Select Category" data={comboboxData || []} />
      <Expenses />
    </Layout>
  );
}
