import { HeadPage } from "@commons/components/modules/Head";
import { revoApi } from "@services/api/revoApi";
import { FC, FormEvent, useEffect, useState } from "react";
import Post from "./components/Post";
import { NEWS_API_KEY, NEWS_API_URL } from "@commons/utils/constans/api";
import Image from "next/image";
import { newsApi } from "@services/api/newsApi";

interface PostInterface {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
    username: string;
  };
  title: string;
  body: string;
  likes: number;
  shares: number;
  comments: number;
  deleted: false;
  deleted_at: Date | null;
  updated_at: Date;
  created_at: Date;
}

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}

const Feed: FC = () => {
  const [body, setBody] = useState<string>("");
  const [listChange, setListChange] = useState<boolean>(false);

  const [news, setNews] = useState<NewsArticle[]>([]);
  const [visibleNews, setVisibleNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [followingPosts, setFollowingPosts] = useState<PostInterface[]>([]);

  const notifications = 4;

  useEffect(() => {
    revoApi.getFollowingPosts().then((data) => {
      setFollowingPosts(data);
    });
  }, [listChange]);

  useEffect(() => {
    newsApi
      .getTechNews()
      .then((data) => {
        setNews(data.articles);
        setVisibleNews(data.articles.slice(0, 6));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao obter notícias:", error);
        setLoading(false);
      });
  }, []);

  const handlePostSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await revoApi.createPost({
      body,
      title: "um titulo",
    });

    setBody("");
    setListChange(!listChange);
  };

  const handleLoadMore = () => {
    const currentVisibleNewsCount = visibleNews.length;
    const nextVisibleNews = news.slice(
      currentVisibleNewsCount,
      currentVisibleNewsCount + 6
    );
    setVisibleNews((prevNews) => [...prevNews, ...nextVisibleNews]);
  };

  const handleLoadLess = () => {
    if (visibleNews.length > 6) {
      setVisibleNews((prevNews) => prevNews.slice(0, visibleNews.length - 6));
    }
  };

  return (
    <>
      <HeadPage title={`(${notifications}) Feed | Revo`} />

      <div className="bg-themeGrey text-white p-4 flex flex-row h-full">
        <div className="w-3/12 mx-auto bg-themeBlack text-white rounded-3xl hidden lg:block">
          <h2 className="text-xl font-bold mb-4">Nome do Usuário</h2>
        </div>

        <div className="w-2/5 mx-auto  rounded-3xl">
          <form
            onSubmit={handlePostSubmit}
            className="w-full mb-4 flex flex-row justify-center items-center bg-themeBlack p-4 rounded-3xl h-32"
          >
            <textarea
              placeholder="O que está acontecendo?"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full px-12 text-white rounded-3xl focus:outline-none max-h-20 min-h-12 bg-themeGrey"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-3xl h-12 ml-2 disabled:bg-blue-900 hover:bg-blue-700 disabled:hover:cursor-not-allowed w-24 max-w-24"
              disabled={body === ""}
            >
              Postar
            </button>
          </form>

          <div className="w-full">
            {followingPosts.map((post) => (
              <Post
                key={post.id}
                body={post.body}
                comments={post.comments}
                likes={post.likes}
                shares={post.shares}
                username={post.user.username}
              />
            ))}
          </div>
        </div>

        <div className="w-3/12 mx-auto bg-themeBlack text-white rounded-3xl hidden lg:block h-full">
          <h2 className="text-xl font-bold mb-4 text-center mt-8">Notícias</h2>
          {loading ? (
            <p>Carregando notícias...</p>
          ) : (
            <>
              <ul>
                {visibleNews
                  .filter(
                    (article) => article.description && article.urlToImage
                  )
                  .map((article, index) => (
                    <li key={index} className="mb-4 px-4">
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline font-medium"
                      >
                        {article.title}
                      </a>
                      {article.urlToImage && (
                        <Image
                          src={article.urlToImage}
                          width={900}
                          height={900}
                          alt="photo"
                          className="rounded-3xl my-4"
                        />
                      )}
                      <p className="text-themeMetal">{article.description}</p>
                      <div className="bg-gray-600 h-px w-full mt-4"></div>
                    </li>
                  ))}
                <div className="text-center pb-4 flex justify-around">
                  {news.length > visibleNews.length && (
                    <button
                      onClick={handleLoadMore}
                      className="text-blue-500 mt-2 cursor-pointer"
                    >
                      Ver mais...
                    </button>
                  )}
                  {visibleNews.length > 6 && (
                    <button
                      onClick={handleLoadLess}
                      className="text-blue-500 mt-2 cursor-pointer"
                    >
                      Ver menos...
                    </button>
                  )}
                </div>
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Feed;
