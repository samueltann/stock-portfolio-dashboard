import { useState } from "react";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const AskAIPage = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ parts: [{ text: question }] }],
      });

      setResponse(result.text || "No response received.");
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setResponse("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">
        Ask AI (Gemini)
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask me anything about stocks or finance..."
          className="w-full p-3 rounded-lg border border-emerald-500 focus:outline-none  focus:ring-2 focus:ring-emerald-600"
          rows={4}
          required
        ></textarea>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg"
            disabled={loading}
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
        </div>
      </form>

      {response && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold text-slate-700 mb-2">AI Response:</h2>
          <p className="text-slate-600 whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </div>
  );
};

export default AskAIPage;
