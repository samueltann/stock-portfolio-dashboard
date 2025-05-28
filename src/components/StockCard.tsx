import type { Stock } from "../Index";

interface StockCardProps {
  stock: Stock;
  onRemove: () => void;
}

function StockCard({ stock, onRemove }: StockCardProps) {
  const isPositive = stock.change >= 0;
  const totalValue = stock.price * stock.shares;

  return (
    // <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-200 hover:transform hover:scale-105 hover:shadow-xl">
    <div className="w-full max-w-sm mx-auto bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-200 hover:transform hover:scale-105 hover:shadow-xl">
      {/* Stock Symbol and Name */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{stock.symbol}</h3>
          <p className="text-slate-400 text-sm truncate">{stock.name}</p>
        </div>
        <button
          onClick={onRemove}
          className="text-slate-500 hover:text-red-400 transition-colors"
          title="Remove from portfolio"
        >
          ×
        </button>
      </div>

      {/* Price */}
      <div className="mb-4">
        <p className="text-2xl font-semibold text-white">
          ${stock.price.toFixed(2)}
        </p>
      </div>

      {/* Change */}
      <div className="mb-4">
        <div
          className={`flex items-center space-x-2 ${
            isPositive ? "text-emerald-400" : "text-red-400"
          }`}
        >
          <span className="text-lg font-medium">
            {isPositive ? "+" : ""}${stock.change.toFixed(2)}
          </span>
          <span className="text-sm">
            ({isPositive ? "+" : ""}
            {stock.changePercent.toFixed(2)}%)
          </span>
        </div>
      </div>

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
    </div>
  );
}

export default StockCard;
