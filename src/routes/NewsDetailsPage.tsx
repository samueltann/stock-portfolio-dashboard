import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface NewsDetail {
  title: string;
  link: string;
  summary: string;
  publisher: string;
}

const NewsDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [newsDetail, setNewsDetail] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await axios.request({
          method: "GET",
          url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/v2/get-details",
          params: { uuid: id, region: "US" },
          headers: {
            "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY!,
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
          },
        });

        const content = response.data.data.contents[0].content;
        const details = {
          title: content.title,
          summary: content.summary,
          link: content.clickThroughUrl.url,
          publisher: content.provider.displayName,
        };

        setNewsDetail(details);
      } catch (error) {
        console.error("Error fetching news detail:", error);
        setNewsDetail(null);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center text-slate-600 py-10">Loading article...</div>
    );
  }

  if (!newsDetail) {
    return (
      <div className="text-center text-slate-600 py-10">Article not found.</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-emerald-600 hover:underline"
      >
        ← Back to News
      </button>

      <h1 className="text-3xl font-bold text-slate-800 mb-2">
        {newsDetail.title}
      </h1>
      <p className="text-slate-500 mb-4">{newsDetail.publisher}</p>
      <p className="text-slate-700 mb-6">{newsDetail.summary}</p>
      <div className="flex justify-end mt-10">
        <a
          href={newsDetail.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-600 hover:underline"
        >
          Read Original Article →
        </a>
      </div>
    </div>
  );
};

export default NewsDetailsPage;
