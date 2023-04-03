import type { AppProps } from "next/app";
import "reactflow/dist/base.css";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
