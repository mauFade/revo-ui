import { ReactNode, FC } from "react";

import Head from "next/head";

interface HeadProps {
  title: string;
  children?: ReactNode;
}

export const HeadPage: FC<HeadProps> = ({ children, title }) => {
  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <title>{title}</title>
      {children}
    </Head>
  );
};
