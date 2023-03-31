import { Html, Head, Main, NextScript } from "next/document";
import { inter } from "@/assets/fonts";

export default function Document() {
  return (
    <Html lang="en" className={`${inter.variable} font-sans`}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
