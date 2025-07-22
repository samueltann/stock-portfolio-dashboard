import StockCard from "./StockCard";
import { useStock } from "../context/StockContext";

function StockList() {
  const { stocks, stockData } = useStock();
  return (
    <>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {stocks.length > 0 &&
          stocks.map((stock) => (
            <StockCard
              key={stock.id}
              stock={stock}
              data={stockData[stock.symbol]}
            />
          ))}

        {stocks.length === 0 && (
          <div className="font-semibold">
            <h1>
              No stocks in portfolio. <br /> Add stock using the form above.
            </h1>
          </div>
        )}
      </ul>
    </>
  );
}

export default StockList;
