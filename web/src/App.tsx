import { ThemeToggle } from "./components/theme-toggle";
import DemoPage from "./app/expenses/page";
import { Combobox } from "./components/ui/combobox";
import { useQuery } from "@tanstack/react-query";
import { getExpenseCategories } from "./api/get-expense-categories";

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
    <div>
      <ThemeToggle />
      <DemoPage />
      <Combobox label="Select Expense Category" data={comboboxData || []} />
    </div>
  );
};

export default App;
