import { Combobox } from "@/components/ui/combobox";
import { useQuery } from "@tanstack/react-query";
import { getExpenseCategories } from "@/api/get-expense-categories";
import Layout from "@/components/layout";
import Expenses from "@/app/expenses/page";

const App = () => {
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
      <Combobox label="Select Expense Category" data={comboboxData || []} />
      <Expenses />
    </Layout>
  );
};

export default App;
