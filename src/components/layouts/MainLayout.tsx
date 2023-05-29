import { ReactNode } from "react";
import Head from "next/head";
import { inter } from "@/assets/fonts";
import { Toaster } from "react-hot-toast";
import ProjectSettingsModal from "@/components/modals/ProjectSettingsModal";
import SchemaTaggingModal from "@/components/modals/SchemaTaggingModal";
import SchemaDeploymentModal from "../modals/SchemaDeploymentModal/SchemaDeploymentModal";

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
            position: "top-left",
            duration: 3000,
            success: { className: "border-2 border-b-green-500" },
            error: { className: "border-2 border-b-red-500" },
          }}
          containerClassName="w-[60%]"
        />

        <SchemaDeploymentModal />
        <ProjectSettingsModal />
        <SchemaTaggingModal />
      </main>
    </>
  );
};

export default MainLayout;
