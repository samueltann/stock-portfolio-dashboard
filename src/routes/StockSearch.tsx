// src/components/StockSearch.tsx
import { useState } from "react";
import {
  searchStockSymbols,
  type SearchResult,
} from "../utils/searchStockSymbols";

function StockSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const matches = await searchStockSymbols(query);
      setResults(matches);
    } catch (err) {
      console.error("Error fetching symbols:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white  rounded shadow">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search stock (e.g. Tesla)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-gray-500">Searching...</p>}

      <ul>
        {results.map((r) => (
          <li key={r.symbol} className="py-2 border m-2">
            <strong>{r.symbol}</strong> — {r.name} ({r.exchange})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StockSearch;
