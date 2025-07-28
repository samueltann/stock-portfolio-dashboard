import { useState } from "react";
import axios from "axios";
import { useStock } from "../context/StockContext";

const AddStockForm = () => {
  const { addStock } = useStock();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    symbol: "",
    name: "",
    shares: "",
  });

  const [isValidSymbol, setIsValidSymbol] = useState<boolean | null>(null);
  const [validating, setValidating] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidSymbol) return;

    await addStock({
      id: formData.symbol.toUpperCase(),
      symbol: formData.symbol.toUpperCase(),
      name: formData.name,
      shares: parseInt(formData.shares),
    });

    setFormData({ symbol: "", name: "", shares: "" });
    setIsOpen(false);
    setIsValidSymbol(null);
    setSuggestions([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "symbol") {
      setIsValidSymbol(null);
      if (value.length >= 1) {
        fetchSuggestions(value);
      } else {
        setSuggestions([]);
      }
    }
  };

  const fetchSuggestions = async (query: string) => {
    setValidating(true);
    try {
      const response = await axios.get(
        "https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete",
        {
          params: { region: "US", q: query },
          headers: {
            "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY!,
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
          },
        }
      );

      const quotes = response.data.quotes || [];
      setSuggestions(quotes);

      const exactMatch = quotes.find(
        (q: any) => q.symbol.toUpperCase() === query.toUpperCase()
      );

      if (exactMatch) {
        setFormData((prev) => ({
          ...prev,
          name: exactMatch.shortname || exactMatch.longname || "",
        }));
        setIsValidSymbol(true);
      } else {
        setIsValidSymbol(false);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setIsValidSymbol(false);
    } finally {
      setValidating(false);
    }
  };

  const handleSuggestionClick = (symbol: string, name: string) => {
    setFormData((prev) => ({
      ...prev,
      symbol,
      name,
    }));
    setSuggestions([]);
    setIsValidSymbol(true);
  };

  return (
    <>
      <div className="mb-24">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 float-right m-4"
        >
          + Add Stock to Portfolio
        </button>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-slate-800 rounded-xl p-6 border border-slate-700 w-full max-w-md z-50 shadow-xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white text-xl"
            >
              ×
            </button>

            <h3 className="text-xl font-semibold text-white mb-6">
              Add New Stock
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 relative">
              <input
                type="text"
                name="symbol"
                value={formData.symbol}
                onChange={handleInputChange}
                placeholder="Stock Symbol (e.g., TSLA)"
                className="w-full bg-slate-700 text-white p-3 rounded-lg"
                required
              />

              {suggestions.length > 0 && (
                <div className="absolute bg-slate-700 text-white rounded-lg shadow-lg z-50 mt-1 w-full max-h-48 overflow-auto">
                  {suggestions.map((s, idx) => (
                    <div
                      key={idx}
                      className="px-4 py-2 hover:bg-slate-600 cursor-pointer"
                      onClick={() =>
                        handleSuggestionClick(
                          s.symbol,
                          s.shortname || s.longname
                        )
                      }
                    >
                      {s.symbol} - {s.shortname || s.longname}
                    </div>
                  ))}
                </div>
              )}

              {validating && (
                <p className="text-slate-400 text-sm">Validating symbol...</p>
              )}
              {isValidSymbol === false && !validating && (
                <p className="text-red-400 text-sm">Invalid stock symbol</p>
              )}
              {isValidSymbol === true && !validating && (
                <p className="text-emerald-400 text-sm">Valid symbol</p>
              )}

              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Company Name"
                className="w-full bg-slate-700 text-white p-3 rounded-lg"
                readOnly
              />
              <input
                type="number"
                name="shares"
                value={formData.shares}
                onChange={handleInputChange}
                placeholder="Shares"
                className="w-full bg-slate-700 text-white p-3 rounded-lg"
                min="1"
                required
              />

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className={`${
                    isValidSymbol
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-gray-600 cursor-not-allowed"
                  } text-white px-6 py-2 rounded-lg font-medium`}
                  disabled={!isValidSymbol || validating}
                >
                  Add Stock
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-lg font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default AddStockForm;
