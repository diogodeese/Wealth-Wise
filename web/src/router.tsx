import { createBrowserRouter } from "react-router-dom";
import App from "./app/pages/App";
import NotFound from "./app/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
