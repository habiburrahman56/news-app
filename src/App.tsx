import { useEffect, useState } from "react";
import NewsList from "./Components/NewsList";
import type { Article } from "./types";

function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;

      if (!apiKey) {
        console.error("VITE_NEWS_API_KEY is not defined in .env file");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${apiKey}`
        );
        const data = await res.json();

        if (data.articles) {
          setArticles(data.articles);
        } else {
          console.error("No articles found:", data);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading news...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
        Latest News
      </h1>
      <NewsList articles={articles.slice(0, 12)} />
    </div>
  );
}

export default App;
