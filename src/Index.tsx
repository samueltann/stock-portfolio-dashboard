import AddStockForm from "./components/AddStockForm";
import PortfolioSummary from "./components/PortfolioSummary";
import Navbar from "./components/Navbar";
import Watchlist from "./components/Watchlist";

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
  return (
    <>
      <div className="min-h-screen bg-slate-300 ">
        {/* Header */}
        <Navbar />
        {/* Add Stock Form */}
        {/* <div className="mb-24"> */}
        <AddStockForm />
        {/* </div> */}

        {/* Portfolio Summary */}
        {/* <div className="mb-8"> */}
        <PortfolioSummary />
        {/* </div> */}
        <Watchlist />
      </div>
    </>
  );
}

export default Index;
