import { useState } from "react";
import { useStock } from "../context/StockContext";

const AddStockForm = () => {
  const { addStock } = useStock();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    symbol: "",
    name: "",
    shares: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.symbol || !formData.name || !formData.shares) return;

    await addStock({
      symbol: formData.symbol.toUpperCase(),
      name: formData.name,
      shares: parseInt(formData.shares),
    });

    setFormData({ symbol: "", name: "", shares: "" });
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
          {/* Blur Overlay */}
          <div
            className="fixed inset-0 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Floating Form Card */}
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

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="symbol"
                value={formData.symbol}
                onChange={handleInputChange}
                placeholder="Stock Symbol (e.g., AAPL)"
                className="w-full bg-slate-700 text-white p-3 rounded-lg"
                required
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Company Name"
                className="w-full bg-slate-700 text-white p-3 rounded-lg"
                required
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
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium"
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
