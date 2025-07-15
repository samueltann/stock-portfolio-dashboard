import { createContext, useContext, useState, type ReactNode } from "react";

export interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  shares: number;
}

interface StockContextType {
  stocks: Stock[];
  addStock: (stock: Omit<Stock, "id">) => void;
  removeStock: (id: string) => void;
  updateStock: (id: string, updatedStock: Partial<Stock>) => void;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export function StockProvider({ children }: { children: ReactNode }) {
  const [stocks, setStocks] = useState<Stock[]>([
    {
      id: "1",
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 175.43,
      change: 2.15,
      changePercent: 1.24,
      shares: 10,
    },
    {
      id: "2",
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      price: 142.56,
      change: -1.23,
      changePercent: -0.86,
      shares: 5,
    },
    {
      id: "3",
      symbol: "MSFT",
      name: "Microsoft Corporation",
      price: 378.91,
      change: 4.32,
      changePercent: 1.15,
      shares: 8,
    },
    {
      id: "4",
      symbol: "TSLA",
      name: "Tesla, Inc.",
      price: 248.87,
      change: -8.45,
      changePercent: -3.29,
      shares: 12,
    },
  ]);

  const addStock = (stock: Omit<Stock, "id">) => {
    const newStock = { ...stock, id: Date.now().toString() };
    setStocks((prev) => [newStock, ...prev]);
  };

  const removeStock = (id: string) => {
    setStocks((prev) => prev.filter((stock) => stock.id !== id));
  };

  const updateStock = (id: string, updatedStock: Partial<Stock>) => {
    setStocks((prev) =>
      prev.map((stock) =>
        stock.id === id ? { ...stock, ...updatedStock } : stock
      )
    );
  };

  return (
    <StockContext.Provider
      value={{ stocks, addStock, removeStock, updateStock }}
    >
      {children}
    </StockContext.Provider>
  );
}

export function useStock() {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error("useStock must be used within a StockProvider");
  }
  return context;
}
