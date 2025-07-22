import StockList from "./StockList";

function PortfolioList() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-5">Your Portfolio</h2>
      <div>
        <StockList />
      </div>
    </div>
  );
}

export default PortfolioList;
