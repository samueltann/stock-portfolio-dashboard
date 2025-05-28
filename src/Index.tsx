import { useState } from "react";
import StockCard from "./components/StockCard";

export interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  shares: number;
}

function Index() {
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
  function addStock(newStock: Omit<Stock, "id">) {
    setStocks((prevStocks) => [
      { ...newStock, id: Date.now().toString() },
      ...prevStocks,
    ]);
  }
  function removeStock(id: string) {
    setStocks((prevStocks) => prevStocks.filter((stock) => stock.id !== id));
  }
  return (
    <>
      {stocks.map((stock) => (
        <StockCard
          key={stock.id}
          stock={stock}
          onRemove={() => removeStock(stock.id)}
        />
      ))}
    </>
  );
}

export default Index;
