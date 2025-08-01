import { useStock } from "../context/StockContext";

function PortfolioSummary() {
  const { stocks, stockData } = useStock();
  const isLoading = stocks.some((stock) => !stockData[stock.symbol]);
  const noStocks = stocks.length === 0;
  if (isLoading) {
    return (
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 max-w-3/4 mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-slate-200">
          Portfolio Summary
        </h2>
        {noStocks ? (
          <div className="text-center text-slate-400 py-10">
            No stocks in portfolio.
          </div>
        ) : (
          <div className="text-center text-slate-400 py-10">
            Loading portfolio data...
          </div>
        )}
      </div>
    );
  }

  const totalValue = stocks.reduce(
    (sum, stock) => sum + stockData[stock.symbol].price * stock.shares,
    0
  );
  const totalDayChange = stocks.reduce(
    (sum, stock) => sum + stockData[stock.symbol].change * stock.shares,
    0
  );
  const totalDayChangePercent =
    totalValue > 0 ? (totalDayChange / (totalValue - totalDayChange)) * 100 : 0;

  const isPositiveChange = totalDayChange >= 0;

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 max-w-3/4 mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-slate-200">
        Portfolio Summary
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Portfolio Value */}
        <div className="bg-slate-700 rounded-lg p-4">
          <h3 className="text-slate-400 text-sm font-medium mb-2">
            Total Portfolio Value
          </h3>
          <p className="text-3xl font-bold text-white">
            ${totalValue.toFixed(2)}
          </p>
        </div>

        {/* Daily Change */}
        <div className="bg-slate-700 rounded-lg p-4">
          <h3 className="text-slate-400 text-sm font-medium mb-2">
            Today's Change
          </h3>
          <p
            className={`text-3xl font-bold ${
              isPositiveChange ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {isPositiveChange ? "+" : ""}${totalDayChange.toFixed(2)}
          </p>
          <p
            className={`text-sm ${
              isPositiveChange ? "text-emerald-400" : "text-red-400"
            }`}
          >
            ({isPositiveChange ? "+" : ""}
            {totalDayChangePercent.toFixed(2)}%)
          </p>
        </div>

        {/* Number of Holdings */}
        <div className="bg-slate-700 rounded-lg p-4">
          <h3 className="text-slate-400 text-sm font-medium mb-2">Holdings</h3>
          <p className="text-3xl font-bold text-white">{stocks.length}</p>
          <p className="text-sm text-slate-400">
            {stocks.length === 1 ? "Stock" : "Stocks"}
          </p>
        </div>
      </div>

      {/* Performance Indicator */}
      {stocks.length > 0 && (
        <div className="mt-6 pt-4 border-t border-slate-600">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Portfolio Performance</span>
            <div
              className={`flex items-center space-x-2 ${
                isPositiveChange ? "text-emerald-400" : "text-red-400"
              }`}
            >
              <span className="text-sm font-medium">
                {isPositiveChange ? "↗" : "↘"}{" "}
                {isPositiveChange ? "Gaining" : "Losing"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PortfolioSummary;
