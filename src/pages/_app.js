import "../scss/custom.scss"; // Adjust the path according to where your SCSS files are
import { useEffect } from "react";
import Head from "next/head";
import { GlobalContextProvider } from "../context/GlobalContext";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  return (
    <>
      <Head>
        {/* Link to favicon located in the public directory */}
        <link rel="icon" href="/favicon.ico" />
        <title>Dhanesh & Co</title>
      </Head>
      <GlobalContextProvider>
        <Component {...pageProps} />
      </GlobalContextProvider>
    </>
  );
}

export default MyApp;
