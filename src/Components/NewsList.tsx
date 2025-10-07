import React from "react";
import type { Article } from "../types";

interface Props {
  articles: Article[];
}

const NewsList: React.FC<Props> = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600">
        No news articles available.
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-[80%] mx-auto flex items-center py-6 gap-4 overflow-hidden">
        <span className="whitespace-nowrap bg-black text-white font-semibold px-4 py-1 rounded-full text-sm md:text-base">
          Breaking News
        </span>

        <div className="relative overflow-hidden w-full h-6 md:h-8">
          <div
            className="flex animate-scroll whitespace-nowrap text-sm md:text-base"
            style={{ animation: "scroll-left 20s linear infinite" }}
          >
            {articles.slice(0, 5).map((article, i) => (
              <span key={i} className="mx-8 text-black text-2xl font-bold">
                {article.title || "Untitled headline"}
              </span>
            ))}
          </div>
          <style>
            {`
              @keyframes scroll-left {
                0% { transform: translateX(100%); }
                100% { transform: translateX(-100%); }
              }
            `}
          </style>
        </div>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-center mb-10 mt-10 text-gray-900">
        All News Articles
      </h1>

      <div className="max-w-[80%] mx-auto px-4 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded shadow hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between h-[480px]"
          >
            <img
              src={article.urlToImage || "/placeholder.png"}
              alt={article.title || "News Image"}
              className="w-full h-60 object-cover rounded"
            />

            <div className="mt-2 flex-1 overflow-hidden">
              <h2 className="font-bold text-lg line-clamp-2">
                {article.title || "Untitled"}
              </h2>

              <p className="text-sm mt-2 line-clamp-4 text-gray-600">
                {article.description || "No description available."}
              </p>
            </div>

            {article.source?.name && (
              <p className="text-xs text-gray-500 mt-1 italic">
                News Source:{" "}
                <span className="font-medium">{article.source.name}</span>
              </p>
            )}

            <a
              href={article.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black mt-4 inline-block border border-black px-4 py-2 rounded hover:bg-black hover:text-white transition-colors duration-300 text-center"
            >
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsList;
