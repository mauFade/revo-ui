import { HeadPage } from "@commons/components/modules/Head";
import { revoApi } from "@services/api/revoApi";
import { FC, FormEvent, useEffect, useState } from "react";
import Post from "./components/Post";

interface PostInterface {
  id: string;
  user_id: string;
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

const Feed: FC = () => {
  const [body, setBody] = useState<string>("");
  const [listChange, setListChange] = useState<boolean>(false);

  const [followingPosts, setFollowingPosts] = useState<PostInterface[]>([]);

  const notifications = 4;

  useEffect(() => {
    const fetchData = async () => {
      const data = await revoApi.getFollowingPosts();

      setFollowingPosts(data);
    };

    fetchData();
  }, [listChange]);

  const handlePostSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await revoApi.createPost({
      body,
      title: "um titulo",
    });

    console.log(response);

    setBody("");
    setListChange(!listChange);
  };

  return (
    <>
      <HeadPage title={`(${notifications}) Feed | Revo`} />

      <div className="bg-themeGrey text-white p-4 h-screen flex flex-row">
        <div className="w-72 mx-auto bg-themeBlack text-white rounded-md hidden lg:block">
          <h2 className="text-xl font-bold mb-4">Nome do Usuário</h2>
        </div>

        <div className="w-2/5 mx-auto">
          <form
            onSubmit={handlePostSubmit}
            className="w-full mb-4 flex flex-row justify-center items-center"
          >
            <textarea
              placeholder="O que está acontecendo?"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-2 bg-themeBlack text-white rounded-md focus:outline-none max-h-20 min-h-12"
            />
            <button
              type="submit"
              className="bg-themeRed text-white py-2 px-4 rounded-md h-12 ml-2 disabled:bg-themeUnactiveRed hover:bg-themeDarkerRed disabled:hover:cursor-not-allowed w-24 max-w-24"
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
                username={post.user_id}
              />
            ))}
          </div>
        </div>

        <div className="w-72 mx-auto bg-themeBlack text-white rounded-md hidden lg:block">
          <h2 className="text-xl font-bold mb-4">Notícias</h2>
          <ul>
            <li>Notícia 1</li>
            <li>Notícia 2</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Feed;
