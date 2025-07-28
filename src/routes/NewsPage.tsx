import { useEffect, useState } from "react";
import axios from "axios";
import { useStock } from "../context/StockContext";
import { useNavigate } from "react-router-dom";

interface NewsItem {
  id: string;
  title: string;
  publisher: string;
  link: string;
  thumbnail?: { resolutions: { url: string }[] };
}

const NewsPage = () => {
  const { stocks } = useStock();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.request({
          method: "POST",
          url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/v2/list",
          params: { region: "US", snippetCount: "20" },
          headers: {
            "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY!,
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            "Content-Type": "text/plain",
          },
          data: "",
        });

        const newsItems = response.data.data.main.stream
          .filter((item: any) => item.content?.title)
          .map((item: any) => item.content);

        setNews(newsItems);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [stocks]);

  if (loading) {
    return (
      <div className="text-center text-slate-600 py-10">Loading news...</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Latest News</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {news.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/news/${item.id}`)}
            className="cursor-pointer bg-white rounded-lg shadow hover:shadow-md transition p-4 flex flex-col"
          >
            {item.thumbnail?.resolutions[0]?.url && (
              <img
                src={item.thumbnail.resolutions[0].url}
                alt={item.title}
                className="rounded-md mb-4 object-cover w-full h-40"
              />
            )}
            <h2 className="text-lg font-semibold text-slate-800 mb-2 line-clamp-2">
              {item.title}
            </h2>
            <p className="text-sm text-slate-500">{item.publisher}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
