import { FC, useState } from "react";
import { BsArrowRepeat, BsChat, BsHeart, BsHeartFill } from "react-icons/bs";

interface PostInterface {
  // title: string;
  username: string;
  body: string;
  likes: number;
  shares: number;
  comments: number;
}

const Post: FC<PostInterface> = (props) => {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <div className="bg-themeBlack p-4 my-4 rounded-3xl shadow-md flex flex-col items-start">
      <div className="flex items-center mb-2">
        <p className="text-themeMetal">@{props.username}</p>
      </div>
      <p className="text-gray-300 text-lg max-w-prose">{props.body}</p>
      <div className="flex mt-2">
        <button
          className="flex items-center mr-4"
          onClick={() => console.log("comentei")}
        >
          <BsChat className="text-themeMetal mr-1" />
          <span className="text-sm">{props.comments}</span>
        </button>
        <button
          className="flex items-center mr-4"
          onClick={() => {
            setClicked(!clicked);
            console.log("GOSTEI");
          }}
        >
          {clicked ? (
            <BsHeartFill className="text-themeRed mr-1" />
          ) : (
            <BsHeart className="text-themeMetal mr-1" />
          )}
          <span className="text-sm">{props.likes}</span>
        </button>
        <button
          className="flex items-center"
          onClick={() => console.log("compartilehi")}
        >
          <BsArrowRepeat className="text-themeMetal mr-1" />
          <span className="text-sm">{props.shares}</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
