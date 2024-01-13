import Image from "next/image";
import { Inter } from "next/font/google";
import { FC } from "react";
import { HeadPage } from "@commons/components/modules/Head";

const Home: FC = () => {
  return (
    <>
      <HeadPage title="Login | Revo" />

      <div className="flex flex-row h-screen w-screen">
        <div className="h-full w-2/4"></div>
        <div className="bg-themeBlack h-full w-2/4">
          <h1>Acesse sua conta</h1>
        </div>
      </div>
    </>
  );
};

export default Home;
