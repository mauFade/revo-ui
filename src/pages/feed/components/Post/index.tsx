import { FC } from "react";

interface PostInterface {
  title: string;
  body: string;
  likes: number;
  shares: number;
  comments: number;
}

const Post: FC<PostInterface> = (props) => {
  return (
    <div className="bg-themeGrey m-6 rounded-3xl  px-6">
      <h1>{props.title}</h1>
      <p>{props.body}</p>
      <p>Curtidas: {props.likes}</p>
      <p>Compartilhamentos: {props.shares}</p>
      <p>Comentários: {props.comments}</p>
    </div>
  );
};

export default Post;
