import { ReactNode } from "react";
import Head from "next/head";

type Props = {
  children: ReactNode;
  headTitle: string;
  metaDescription: string;
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
        <meta name="description" content={metaDescription} />
      </Head>

      <main>{children}</main>
    </>
  );
};

export default MainLayout;
