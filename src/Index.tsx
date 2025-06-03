import { useState } from "react";
import StockList from "./components/StockList";
import AddStockForm from "./components/AddStockForm";
import PortfolioSummary from "./components/PortfolioSummary";
import Navbar from "./components/Navbar";

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
      <div className="min-h-screen bg-slate-300 ">
        {/* Header */}
        <Navbar />
        {/* Add Stock Form */}
        {/* <div className="mb-24"> */}
        <AddStockForm onAddStock={addStock} />
        {/* </div> */}

        {/* Portfolio Summary */}
        <div className="mb-8">
          <PortfolioSummary stocks={stocks} />
        </div>
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold mb-5">Your Watchlist</h2>
          <div>
            <StockList stocks={stocks} removeStock={removeStock} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
