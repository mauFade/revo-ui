import { HeadPage } from "@commons/components/modules/Head";
import Header from "@commons/components/modules/Header";
import { revoApi } from "@services/api/revoApi";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

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
  const [followingPosts, setFollowingPosts] = useState<PostInterface[]>([]);

  const notifications = 4;

  useEffect(() => {
    const fetchData = async () => {
      const data = await revoApi.getFollowingPosts();
      setFollowingPosts(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <HeadPage title={`(${notifications}) Feed | Revo`} />

      <Header />
      <div className="h-screen flex flex-row justify-center items-center">
        <div className="bg-themeBlack h-full w-1/3 mt-16 rounded-t-3xl">
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
