import { Button } from "@/components/ui/button";
import { ModeToggle } from "./components/mode-toggle";

const App = () => {
  return (
    <div>
      Hello World
      <Button variant={"default"} size={"lg"}>
        Button
      </Button>
      <ModeToggle />
    </div>
  );
};

export default App;
