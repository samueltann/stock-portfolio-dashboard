// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { StockProvider } from "./context/StockContext";
import "./index.css";
import Index from "./routes/Index.tsx";
import App from "./App.tsx";
import StockSearch from "./routes/StockSearch.tsx";
import LoginPage from "./routes/LoginPage.tsx";
import SignUpPage from "./routes/SignUpPage.tsx";
import NewsPage from "./routes/NewsPage.tsx";
import NewsDetailsPage from "./routes/NewsDetailsPage.tsx";
import AskAIPage from "./routes/AskAIPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Index /> },
      { path: "search", element: <StockSearch /> },
      { path: "news", element: <NewsPage /> },
      { path: "news/:id", element: <NewsDetailsPage /> },
      { path: "askAI", element: <AskAIPage /> },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    children: [],
  },
  {
    path: "/signup",
    element: <SignUpPage />,
    children: [],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StockProvider>
      <RouterProvider router={router} />
    </StockProvider>
  </StrictMode>
);
