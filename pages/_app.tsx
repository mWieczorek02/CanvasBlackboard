import "../styles/globals.css";
import "../components/WhiteboardSelector/style.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { PageNavbar } from "../components/navbar/Navbar";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ImageType, LineType } from "../interfaces";

function MyApp({ Component, pageProps }: AppProps) {
  useLocalStorage<(LineType | ImageType)[]>("boards");

  return (
    <>
      <PageNavbar />
      <Component {...pageProps} suppressHydrationWarning={true} />
    </>
  );
}

export default MyApp;
