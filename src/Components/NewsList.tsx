import React from "react";
import type { Article } from "../types";

interface Props {
  articles: Article[];
}

const NewsList: React.FC<Props> = ({ articles }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <div key={index} className="bg-white p-4 rounded shadow">
          <img
            src={article.urlToImage || "/placeholder.png"}
            alt={article.title}
            className="w-full h-48 object-cover rounded"
          />
          <h2 className="font-bold text-lg mt-2">{article.title}</h2>
          <p className="text-sm mt-1">{article.description}</p>
          <a
            href={article.url}
            target="_blank"
            className="text-blue-500 mt-2 inline-block"
          >
            Read more
          </a>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
