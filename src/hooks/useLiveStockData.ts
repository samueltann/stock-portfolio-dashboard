import { useEffect, useState } from "react";
import axios from "axios";

export interface LiveStockData {
  price: number;
  change: number;
  changePercent: number;
  loading: boolean;
  error?: string;
}

export function useLiveStockData(symbols: string[]): { [symbol: string]: LiveStockData } {
  const [data, setData] = useState<{ [symbol: string]: LiveStockData }>({});

  useEffect(() => {
    async function fetchStock() {
      try {
        const response = await axios.request({
          method: "GET",
          url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes",
          params: {
            region: "US",
            symbols: symbols.join(","),
          },
          headers: {
            "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY!,
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
          },
        });

        const quotes = response.data.quoteResponse.result;
        const updated: { [symbol: string]: LiveStockData } = {};

        for (const quote of quotes) {
          updated[quote.symbol] = {
            price: quote.regularMarketPrice,
            change: quote.regularMarketChange,
            changePercent: quote.regularMarketChangePercent,
            loading: false,
          };
        }

        setData(updated);
      } catch (error: any) {
        const errorMsg = error.message || "Error fetching data";
        const fallback: { [symbol: string]: LiveStockData } = {};
        for (const s of symbols) {
          fallback[s] = {
            price: 0,
            change: 0,
            changePercent: 0,
            loading: false,
            error: errorMsg,
          };
        }
        setData(fallback);
      }
    }

    fetchStock();
    const interval = setInterval(fetchStock, 300000);
    return () => clearInterval(interval);
  }, []);

  return data;
}
