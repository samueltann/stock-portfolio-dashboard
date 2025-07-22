import AddStockForm from "../components/AddStockForm";
import PortfolioSummary from "../components/PortfolioSummary";
import PortfolioList from "../components/PortfolioList";
// import Test from "./Test";

function Index() {
  return (
    <>
      <AddStockForm />
      <PortfolioSummary />
      <PortfolioList />
      {/* <Test /> */}
    </>
  );
}

export default Index;
