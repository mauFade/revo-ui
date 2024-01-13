import { FC } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={false}
        pauseOnHover={true}
      />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
