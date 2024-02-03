import { ModeToggle } from "./components/mode-toggle";
import DemoPage from "./expenses/page";
import { Combobox } from "./components/ui/combobox";
// import { useQuery } from "@tanstack/react-query";

// import { IComboboxItem } from "./interfaces/comboboxItem";

// const fetchExpenseCategories = async () => {
//   const response = await fetch("http://localhost:3000/expense-categories");
//   if (!response.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   return response.json();
// };

const App = () => {
  // const { data, error, isLoading } = useQuery(
  //   "expenseCategories",
  //   fetchExpenseCategories
  // );

  return (
    <div>
      <ModeToggle />
      <DemoPage />
      <Combobox
        label="Select Expense Category"
        data={[
          { id: "1", text: "Test 1" },
          { id: "2", text: "Test 2" },
        ]}
      />
    </div>
  );
};

export default App;
