import Image from "next/image";
import { FC, MouseEvent, useState } from "react";
import { BsArrowRepeat, BsChat, BsHeart, BsHeartFill } from "react-icons/bs";
import CommentsModal from "../modals/CommentsModal";
import user from "../../../../../public/user.png";
import { revoApi } from "@services/api/revoApi";
import { showToast } from "@commons/utils/showToast";

interface PostInterface {
  post_id: string;
  name: string;
  avatar: string | null;
  liked_by_me: boolean;
  username: string;
  body: string;
  likes: number;
  shares: number;
  comments: number;
}

const Post: FC<PostInterface> = (props) => {
  const [isCommentsModalOpen, setIsCommentsModalOpen] =
    useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleToggleCommentsModal = () => {
    setIsCommentsModalOpen(!isCommentsModalOpen);
  };

  const handleLike = async () => {
    setIsLiked(!isLiked);

    await revoApi.likePost({
      post_id: props.post_id,
    });
  };

  const getLikeIcon = () => {
    if (props.liked_by_me && isLiked) {
      return <BsHeart className="text-themeMetal mr-1" />;
    }

    if (props.liked_by_me || isLiked) {
      return <BsHeartFill className="text-themeRed mr-1" />;
    }

    return <BsHeart className="text-themeMetal mr-1" />;
  };

  const computeLikeCount = () => {
    if (props.liked_by_me) {
      return isLiked ? props.likes - 1 : props.likes;
    } else {
      return isLiked ? props.likes + 1 : props.likes;
    }
  };

  return (
    <div className="bg-themeBlack p-6 my-4 rounded-3xl shadow-md flex flex-col items-start">
      <div className="flex flex-row items-center mb-2 text-themeMetal">
        <Image
          src={props.avatar ? props.avatar : user}
          width={70}
          height={70}
          alt="photo"
          className="rounded-full my-4"
        />
        <div className="flex flex-col ml-3">
          <strong className="mb-2">{props.name}</strong>
          <p>@{props.username}</p>
        </div>
      </div>
      <p className="text-gray-300 text-lg max-w-prose">{props.body}</p>
      <div className="h-px w-full my-4 bg-gray-600"></div>
      <div className="flex mt-2">
        <button
          className="flex items-center mr-4"
          onClick={handleToggleCommentsModal}
        >
          <BsChat className="text-themeMetal mr-1" />
          <span className="text-sm">{props.comments}</span>
        </button>
        <button className="flex items-center mr-4" onClick={handleLike}>
          {getLikeIcon()}
          <span className="text-sm">{computeLikeCount()}</span>
        </button>
        <button
          className="flex items-center"
          onClick={() => console.log("compartilehi")}
        >
          <BsArrowRepeat className="text-themeMetal mr-1" />
          <span className="text-sm">{props.shares}</span>
        </button>
      </div>

      <CommentsModal
        isOpen={isCommentsModalOpen}
        onClose={handleToggleCommentsModal}
      />
    </div>
  );
};

export default Post;
