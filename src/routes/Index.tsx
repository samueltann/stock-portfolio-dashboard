import AddStockForm from "../components/AddStockForm";
import PortfolioSummary from "../components/PortfolioSummary";
import PortfolioList from "../components/PortfolioList";

function Index() {
  return (
    <>
      <AddStockForm />
      <PortfolioSummary />
      <PortfolioList />
    </>
  );
}

export default Index;
