import AddStockForm from "../components/AddStockForm";
import PortfolioSummary from "../components/PortfolioSummary";
import Watchlist from "../components/Watchlist";

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
      <AddStockForm />
      <PortfolioSummary />
      <Watchlist />
    </>
  );
}

export default Index;
