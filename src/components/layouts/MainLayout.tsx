import { ReactNode } from "react";
import Head from "next/head";
import { inter } from "@/assets/fonts";
import MigrationModal from "@/components/MigrationModal";

type Props = {
  children: ReactNode;
  headTitle?: string;
  metaDescription?: string;
  showHeader?: boolean;
};

const MainLayout = ({
  headTitle = "Visula",
  metaDescription = "",
  children,
}: // showHeader = true,
Props) => {
  return (
    <>
      <Head>
        <title>{headTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metaDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* {showHeader ? <Header /> : <DashboardTopBar />} */}
      <main className={`bg-gray-50 ${inter.variable}`}>
        {children}
        <MigrationModal />
      </main>
    </>
  );
};

export default MainLayout;
