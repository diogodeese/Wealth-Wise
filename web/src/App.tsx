import { Button } from "@/components/ui/button";
import { ModeToggle } from "./components/mode-toggle";
import DemoPage from "./expenses/page";

const App = () => {
  return (
    <div>
      <ModeToggle />
      <DemoPage />
    </div>
  );
};

export default App;
