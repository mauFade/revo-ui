import { HeadPage } from "@commons/components/modules/Head";
import { tokenKey } from "@commons/utils/constans/header";
import { revoApi } from "@services/api/revoApi";
import { useRouter } from "next/navigation";
import { FC } from "react";

const Feed: FC = () => {
  const notifications = 4;
  const router = useRouter();

  const getPosts = async () => {
    const data = await revoApi.getFollowingPosts();
  };

  return (
    <>
      <HeadPage title={`(${notifications}) Revo`} />

      <div className="h-screen flex flex-row justify-center items-center">
        <div className="bg-themeBlack h-full w-2/3">
          <button onClick={getPosts}>click</button>
        </div>
      </div>
    </>
  );
};

export default Feed;
