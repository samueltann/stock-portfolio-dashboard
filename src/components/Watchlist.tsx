import { useStock } from "../context/StockContext";
import StockList from "./StockList";

function Watchlist() {
  const { stocks, removeStock } = useStock();
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-5">Your Watchlist</h2>
      <div>
        <StockList stocks={stocks} removeStock={removeStock} />
      </div>
    </div>
  );
}

export default Watchlist;
