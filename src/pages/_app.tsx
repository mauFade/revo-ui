import { FC } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <ToastContainer />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
