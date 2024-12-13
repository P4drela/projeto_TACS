import React from "react";

const NewsModal = ({ news, onClose }) => {
  const filteredNews = news.filter(
    (article) =>
      article.title && !article.title.toLowerCase().includes("[removed]")
  );

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white bg-opacity-70 w-4/5 h-4/5 overflow-y-scroll rounded-lg shadow-lg p-6 border-4 border-black">
        <header className="text-2xl font-bold mb-4 fixed top-10 text-white drop-shadow-[0_5px_1px_rgba(0,0,0,0.8)]">
          📰Notícias Relacionadas📰
        </header>
        <button
          className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={onClose}
        >
          Fechar
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16 text-center">
          {filteredNews.length > 0 ? (
            filteredNews.map((article, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow-md flex flex-col"
              >
                {article.imageUrl && (
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <div className="flex flex-col justify-between">
                  <h3 className="font-bold text-lg mb-6 ">{article.title}</h3>
                  <p>{article.summary}</p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-center"
                  >
                    Ver mais
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p>Não há notícias disponíveis nesta localização.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsModal;
