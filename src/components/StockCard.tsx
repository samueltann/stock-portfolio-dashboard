import { useStock, type Stock } from "../context/StockContext";
import { type LiveStockData } from "../hooks/useLiveStockData";

interface StockCardProps {
  stock: Stock;
  data: LiveStockData;
}

function StockCard({ data, stock }: StockCardProps) {
  const { removeStock } = useStock();

  const isPositive = data?.change >= 0;
  const totalValue = data?.price ? data.price * stock.shares : 0;

  return (
    <li className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-200 hover:transform hover:scale-105 hover:shadow-xl">
      {/* Stock Symbol and Name */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{stock.symbol}</h3>
          <p className="text-slate-400 text-sm truncate">{stock.name}</p>
        </div>
        <button
          onClick={() => removeStock(stock.id)}
          className="text-slate-500 hover:text-red-400 transition-colors"
          title="Remove from portfolio"
        >
          ×
        </button>
      </div>

      {/* Price */}
      <div className="mb-4">
        {data?.loading ? (
          <p className="text-slate-400 text-sm">Loading price...</p>
        ) : data?.error ? (
          <p className="text-red-400 text-sm">Error: {data.error}</p>
        ) : data?.price ? (
          <p className="text-2xl font-semibold text-white">
            ${data.price.toFixed(2)}
          </p>
        ) : (
          <p className="text-slate-400 text-sm">Loading price...</p>
        )}
      </div>

      {/* Change */}
      {!data?.loading && !data?.error && (
        <div className="mb-4">
          <div
            className={`flex items-center space-x-2 ${
              isPositive ? "text-emerald-400" : "text-red-400"
            }`}
          >
            <span className="text-lg font-medium">
              {isPositive ? "+" : ""}${data?.change.toFixed(2)}
            </span>
            <span className="text-sm">
              ({isPositive ? "+" : ""}
              {data?.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      )}

      {/* Holdings */}
      <div className="border-t border-slate-700 pt-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-400">Shares:</span>
          <span className="text-white font-medium">{stock.shares}</span>
        </div>
        <div className="flex justify-between items-center text-sm mt-2">
          <span className="text-slate-400">Total Value:</span>
          <span className="text-white font-medium">
            ${totalValue.toFixed(2)}
          </span>
        </div>
      </div>
    </li>
  );
}

export default StockCard;
