import { FC, FormEvent } from "react";
import { HeadPage } from "@commons/components/modules/Head";
import Form from "@commons/components/modules/Form";
import Button from "@commons/components/modules/Button";

const Home: FC = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("AEHO");
  };

  return (
    <>
      <HeadPage title="Login | Revo" />

      <div className="flex flex-row h-screen w-screen">
        <div className="h-full w-2/4"></div>
        <div className="flex flex-col justify-center items-center bg-themeBlack h-full w-2/4">
          <h1>Acesse sua conta</h1>
          <h3>Revo, onde as coisas acontecem!</h3>
          <form onSubmit={handleSubmit} className="w-3/5">
            <button
              type="submit"
              className="w-full bg-themeRed h-10 rounded-md hover:bg-themeDarkerRed transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
