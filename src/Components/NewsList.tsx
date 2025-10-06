import React from "react";
import type { Article } from "../types";

interface NewsListProps {
  articles: Article[];
}

const NewsList: React.FC<NewsListProps> = ({ articles }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-4">
      {articles.map((article, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
          {article.urlToImage && (
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-48 object-cover rounded"
            />
          )}
          <h2 className="font-bold text-lg mt-2">{article.title}</h2>
          <p className="text-sm text-gray-600 mt-1">{article.description}</p>
          <div className="text-xs text-gray-400 mt-2">
            Source: {article.source.name}
          </div>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-sm font-semibold mt-3 inline-block"
          >
            Read more →
          </a>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
