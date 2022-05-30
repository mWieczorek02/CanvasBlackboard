import "../styles/globals.css";
import "../components/WhiteboardSelector/style.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { PageNavbar } from "../components/navbar/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <PageNavbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
