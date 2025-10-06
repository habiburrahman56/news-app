import { useEffect, useState } from "react";
import NewsList from "./Components/NewsList";
import type { Article } from "./types";

function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = import.meta.env.VITE_NEWS_API_KEY;
        const res = await fetch(
          `https://newsapi.org/v2/everything?q=bitcoin&apiKey=cbccf3ba41c940b3969419fc2260047a${apiKey}`
        );
        const data = await res.json();
        setArticles(data.articles);
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
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-center py-6 text-blue-600">
       Latest News
      </h1>
      <NewsList articles={articles} />
    </div>
  );
}

export default App;
