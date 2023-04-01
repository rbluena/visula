import { ReactNode } from "react";
import Head from "next/head";
import Header from "./Header";

type Props = {
  children: ReactNode;
  headTitle?: string;
  metaDescription?: string;
};

const MainLayout = ({
  headTitle = "Visula",
  metaDescription = "",
  children,
}: Props) => {
  return (
    <>
      <Head>
        <title>{headTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metaDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gray-100 min-h-screen">
        <Header />
        {children}
      </main>
    </>
  );
};

export default MainLayout;
