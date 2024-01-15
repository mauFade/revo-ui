import { HeadPage } from "@commons/components/modules/Head";
import Header from "@commons/components/modules/Header";
import { revoApi } from "@services/api/revoApi";
import { useRouter } from "next/navigation";
import { FC, FormEvent, useEffect, useState } from "react";

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
  const [title, setTitle] = useState<string>("");
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
      title,
    });

    setListChange(!listChange);
  };

  return (
    <>
      <HeadPage title={`(${notifications}) Feed | Revo`} />

      <Header />
      <div className="h-full flex flex-col justify-center items-center">
        <div className="bg-themeBlack h-44 w-1/3 mt-16 rounded-3xl border border-themeMetal">
          <form onSubmit={handlePostSubmit} className="p-4 ">
            <input
              type="text"
              className="hover:outline-none focus:outline-none mx-2 text-themeBlack font-semibold placeholder:text-themeBlack"
              value={title}
              placeholder="Título"
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              className="hover:outline-none focus:outline-none mx-2 text-themeBlack font-semibold placeholder:text-themeBlack"
              placeholder="Sobre o que"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <button
              type="submit"
              className="bg-themeRed w-72"
              disabled={title === "" && body === ""}
            >
              Criar
            </button>
          </form>
        </div>
        <div className="bg-themeBlack h-full w-1/3 mt-16 rounded-t-3xl border-x border-t border-themeMetal">
          <ul>
            {followingPosts.map((post) => (
              <li key={post.id} className="pb-4">
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <p>Curtidas: {post.likes}</p>
                <p>Compartilhamentos: {post.shares}</p>
                <p>Comentários: {post.comments}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Feed;
