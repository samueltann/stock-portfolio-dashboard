// StockContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";
import {
  useLiveStockData,
  type LiveStockData,
} from "../hooks/useLiveStockData";

export interface Stock {
  id: string;
  symbol: string;
  name: string;
  shares: number;
}

interface StockContextType {
  stocks: Stock[];
  addStock: (stock: Omit<Stock, "id">) => void;
  removeStock: (id: string) => void;
  updateStock: (id: string, updatedStock: Partial<Stock>) => void;
  stockData: { [symbol: string]: LiveStockData };
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export function StockProvider({ children }: { children: ReactNode }) {
  const [stocks, setStocks] = useState<Stock[]>([
    { id: "1", symbol: "AAPL", name: "Apple Inc.", shares: 10 },
    { id: "2", symbol: "GOOGL", name: "Alphabet Inc.", shares: 5 },
  ]);

  const addStock = (stock: Omit<Stock, "id">) => {
    setStocks((prev) => [...prev, { ...stock, id: Date.now().toString() }]);
  };

  const removeStock = (id: string) => {
    setStocks((prev) => prev.filter((s) => s.id !== id));
  };

  const updateStock = (id: string, updatedStock: Partial<Stock>) => {
    setStocks((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updatedStock } : s))
    );
  };
  const symbols = stocks.map((stock) => stock.symbol);
  const stockData = useLiveStockData(symbols);

  return (
    <StockContext.Provider
      value={{ stocks, addStock, removeStock, updateStock, stockData }}
    >
      {children}
    </StockContext.Provider>
  );
}

export function useStock() {
  const context = useContext(StockContext);
  if (!context) throw new Error("useStock must be used within StockProvider");
  return context;
}
