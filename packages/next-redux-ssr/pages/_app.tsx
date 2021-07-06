import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { wrapper } from "../store";
import "@isotop/kit/build/theme/colors.css";
import "@isotop/kit/build/theme/typography.css";
import "@isotop/kit/build/theme/spacing.css";
import "@isotop/kit/build/theme/theme.css";
import "@isotop/kit/build/theme/general.css";
import "@isotop/kit/build/theme/base.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <React.Fragment>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@500;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </React.Fragment>
  );
};

export default wrapper.withRedux(App);
