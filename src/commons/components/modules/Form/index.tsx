import { FC, FormEvent, ReactNode } from "react";

interface PropsInterface {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

const Form: FC<PropsInterface> = (props) => {
  return <form onSubmit={props.onSubmit}>{props.children}</form>;
};

export default Form;
