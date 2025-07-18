import { useEffect, useState } from "react";
import { fetchLivePrice } from "../utils/fetchLivePrices";

type Stock = {
  symbol: string;
  name: string;
  shares: number;
};

type Props = {
  stock: Stock;
};

export default function PortfolioItem({ stock }: Props) {
  const [liveData, setLiveData] = useState<{
    price: number;
    change: number;
    changePercent: number;
  } | null>(null);

  useEffect(() => {
    fetchLivePrice(stock.symbol).then((data) => {
      if (data) setLiveData(data);
    });
  }, [stock.symbol]);

  return (
    <div className="p-4 border rounded">
      <h3>
        {stock.name} ({stock.symbol})
      </h3>
      <p>Shares: {stock.shares}</p>
      {liveData ? (
        <>
          <p>Price: ${liveData.price.toFixed(2)}</p>
          <p style={{ color: liveData.change >= 0 ? "green" : "red" }}>
            Change: {liveData.change.toFixed(2)} (
            {liveData.changePercent.toFixed(2)}%)
          </p>
        </>
      ) : (
        <p>Loading price...</p>
      )}
    </div>
  );
}
