import { HeadPage } from "@commons/components/modules/Head";
import Header from "@commons/components/modules/Header";
import { revoApi } from "@services/api/revoApi";
import { useRouter } from "next/navigation";
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

    await revoApi.createPost({
      body,
    });

    setListChange(!listChange);
  };

  return (
    <>
      <HeadPage title={`(${notifications}) Feed | Revo`} />
      <div className="bg-themeBlack"></div>
      <Header />

      <div className="bg-themeBlack flex flex-row w-full justify-evenly h-full">
        <div className="bg-themeGrey rounded-t-3xl w-1/4">ESQUERDA</div>

        <div className="h-full w-2/5 flex flex-col justify-center items-center">
          <div className=" w-full bg-themeGrey">
            <form onSubmit={handlePostSubmit}>
              <input
                type="text"
                className="hover:outline-none focus:outline-none text-themeBlack font-semibold placeholder:text-themeBlack"
                placeholder="Compartilhe alguma coisa..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
              <button
                type="submit"
                className="bg-themeRed w-72 disabled:bg-themeUnactiveRed hover:bg-themeDarkerRed transition-colors"
                disabled={body === ""}
                hidden={body === ""}
              >
                Criar
              </button>
            </form>
          </div>

          <div className="h-px bg-themeMetal w-full my-7"></div>

          <div className=" w-full bg-themeGrey rounded-t-3xl">
            <ul>
              {followingPosts.map((post) => (
                <li key={post.id}>
                  <Post
                    body={post.body}
                    comments={post.comments}
                    likes={post.likes}
                    shares={post.shares}
                    title={post.title}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-themeGrey rounded-t-3xl w-1/4">DIREITA</div>
      </div>
    </>
  );
};

export default Feed;
