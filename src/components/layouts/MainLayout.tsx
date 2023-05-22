import { ReactNode } from "react";
import Head from "next/head";
import { inter } from "@/assets/fonts";
import { Toaster } from "react-hot-toast";
import MigrationModal from "@/components/modals/MigrationModal";
import ProjectSettingsModal from "@/components/modals/ProjectSettingsModal";
import SchemaTaggingModal from "@/components/modals/SchemaTaggingModal";

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
}: Props) => {
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
        <Toaster
          toastOptions={{
            position: "bottom-left",
            className: "border-b border-b-green-400",
            success: {
              duration: 3000,
              className: "border-b-2 border-b-green-400",
            },
          }}
          containerClassName="w-[60%]"
        />

        <MigrationModal />
        <ProjectSettingsModal />
        <SchemaTaggingModal />
      </main>
    </>
  );
};

export default MainLayout;
