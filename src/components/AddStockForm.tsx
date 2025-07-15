import { useState } from "react";
import { useStock } from "../context/StockContext";
import { type Stock } from "../Index";

const AddStockForm = () => {
  const { addStock } = useStock();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    symbol: "",
    name: "",
    price: "",
    change: "",
    changePercent: "",
    shares: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.symbol ||
      !formData.name ||
      !formData.price ||
      !formData.shares
    ) {
      return;
    }

    const newStock: Omit<Stock, "id"> = {
      symbol: formData.symbol.toUpperCase(),
      name: formData.name,
      price: parseFloat(formData.price),
      change: parseFloat(formData.change) || 0,
      changePercent: parseFloat(formData.changePercent) || 0,
      shares: parseInt(formData.shares),
    };

    addStock(newStock);
    setFormData({
      symbol: "",
      name: "",
      price: "",
      change: "",
      changePercent: "",
      shares: "",
    });
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) {
    return (
      <div className="mb-24">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 float-right m-4"
        >
          <span>+</span>
          <span>Add Stock to Portfolio</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 m-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">Add New Stock</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-slate-400 hover:text-white transition-colors"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Stock Symbol *
            </label>
            <input
              type="text"
              name="symbol"
              value={formData.symbol}
              onChange={handleInputChange}
              placeholder="e.g., AAPL"
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Company Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Apple Inc."
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Current Price *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Shares Owned *
            </label>
            <input
              type="number"
              name="shares"
              value={formData.shares}
              onChange={handleInputChange}
              placeholder="0"
              min="1"
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Daily Change ($)
            </label>
            <input
              type="number"
              name="change"
              value={formData.change}
              onChange={handleInputChange}
              placeholder="0.00"
              step="0.01"
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Daily Change (%)
            </label>
            <input
              type="number"
              name="changePercent"
              value={formData.changePercent}
              onChange={handleInputChange}
              placeholder="0.00"
              step="0.01"
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Add Stock
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStockForm;
