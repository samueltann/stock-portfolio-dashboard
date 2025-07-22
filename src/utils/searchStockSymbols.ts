import axios from "axios";

const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

export interface SearchResult {
  symbol: string;
  name: string;
  exchange: string;
}

export async function searchStockSymbols(query: string): Promise<SearchResult[]> {
  const url = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete";

  const response = await axios.get(url, {
    params: {
      q: query,
      region: "US",
    },
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
    },
  });

  return response.data.quotes
    .filter((item: any) => item.quoteType === "EQUITY")
    .map((item: any) => ({
      symbol: item.symbol,
      name: item.shortname || item.longname || "Unknown Company",
      exchange: item.exchDisp || item.exchange || "N/A",
    }));
}
