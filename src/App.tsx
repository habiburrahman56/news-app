import { useEffect, useState } from "react";
import NewsList from "./Components/NewsList";
import type { Article } from "./types";

function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("bitcoin");

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;

      if (!apiKey) {
        console.error("VITE_NEWS_API_KEY is not defined in .env file");
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const res = await fetch(
          `https://newsapi.org/v2/everything?q=${encodeURIComponent(
            searchTerm
          )}&apiKey=${apiKey}`
        );
        const data = await res.json();

        if (data.articles) {
          setArticles(data.articles);
          setVisibleCount(6);
        } else {
          console.error("No articles found:", data);
          setArticles([]);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [searchTerm]);

  const handleSeeMore = () => {
    setVisibleCount(articles.length);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search")?.toString().trim();
    if (query) setSearchTerm(query);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        <img
          src="https://media.tenor.com/guhB4PpjrmUAAAAM/loading-loading-gif.gif"
          alt="loading-img"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-14">
      <div className="flex flex-row justify-between items-center mb-10 w-full max-w-[80%] mx-auto gap-4 px-4">
        <h1 className="text-3xl font-bold text-black capitalize w-[30%]">
          Latest News
        </h1>

        <form onSubmit={handleSearch} className="flex w-[30%]">
          <input
            type="text"
            name="search"
            placeholder="Search news..."
            className="flex-1 px-4 py-2 border border-gray-400 rounded-l-lg focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-r-lg hover:bg-black transition"
          >
            Search
          </button>
        </form>
      </div>

      <NewsList articles={articles.slice(0, visibleCount)} />

      {visibleCount < articles.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSeeMore}
            className="text-black mt-4 inline-block border border-black px-4 py-2 rounded hover:bg-black hover:text-white transition-colors duration-300 text-center"
          >
            See More News
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
