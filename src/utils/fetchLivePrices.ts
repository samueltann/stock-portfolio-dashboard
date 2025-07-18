import axios from "axios";

const API_HOST = "apidojo-yahoo-finance-v1.p.rapidapi.com";
const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

export const fetchLivePrice = async (symbol: string) => {
  try {
    const response = await axios.get(
      `https://${API_HOST}/market/v2/get-quotes`,
      {
        params: {
          symbols: symbol,
          region: "US",
        },
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": API_HOST,
        },
      }
    );

    const result = response.data?.quoteResponse?.result;

    if (!result || result.length === 0) {
      throw new Error(`No quote data found for ${symbol}`);
    }

    const quote = result[0];

    return {
      price: quote.regularMarketPrice ?? 0,
      change: quote.regularMarketChange ?? 0,
      changePercent: quote.regularMarketChangePercent ?? 0,
    };
  } catch (error) {
    console.error(`Error fetching live data for ${symbol}:`, error);
    return null;
  }
};
