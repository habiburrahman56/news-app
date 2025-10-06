import React from "react";
import type { Article } from "../types";

interface Props {
  articles: Article[];
}

const NewsList: React.FC<Props> = ({ articles }) => {
  return (
    <div className="max-w-[80%] mx-auto px-4 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded shadow hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between h-[450px]"
        >
          <img
            src={article.urlToImage ?? "/placeholder.png"}
            alt={article.title ?? "News Image"}
            className="w-full h-60 object-cover rounded"
          />
          <div className="mt-2 flex-1 overflow-hidden">
            <h2 className="font-bold text-lg">{article.title}</h2>
            <p className="text-sm mt-1 line-clamp-4">{article.description}</p>
          </div>

          <a
            href={article.url}
            className="text-black mt-4 inline-block border border-black px-4 py-2 rounded hover:bg-black hover:text-white transition-colors duration-300 text-center"
          >
            Read more
          </a>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
