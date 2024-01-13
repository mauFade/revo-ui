import { FC } from "react";

interface PropsInterface {
  type: "button" | "submit" | "reset";
  value: string;
}

const Button: FC<PropsInterface> = (props) => {
  return (
    <button className="bg-themeRed w-72" type={props.type}>
      {props.value}
    </button>
  );
};

export default Button;
