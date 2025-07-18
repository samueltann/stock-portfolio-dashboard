import AddStockForm from "../components/AddStockForm";
import PortfolioSummary from "../components/PortfolioSummary";
import Watchlist from "../components/Watchlist";
import PortfolioItem from "../components/PortfolioItem";

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
      <PortfolioItem
        stock={{ symbol: "AAPL", name: "Apple Inc.", shares: 1 }}
      />
    </>
  );
}

export default Index;
