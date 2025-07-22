// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import { StockProvider } from "./context/StockContext"; // import this
import { StockProvider } from "./context/StockContext";
import "./index.css";
import Chatbot from "./routes/Chatbot.tsx";
import Index from "./routes/Index.tsx";
import App from "./App.tsx";
import StockSearch from "./routes/StockSearch.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Index /> },
      { path: "search", element: <StockSearch /> },
      { path: "askAI", element: <Chatbot /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StockProvider>
      <RouterProvider router={router} />
    </StockProvider>
  </StrictMode>
);
