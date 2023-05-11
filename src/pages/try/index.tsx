import { GetServerSideProps } from "next";
import { ReactFlowProvider } from "reactflow";
import { useEffect } from "react";
import { MainLayout, NodesEditor, CodeEditor } from "@/components";
import { useUIStore } from "@/lib/client/store/ui";
import UpdateModelModal from "@/components/modals/UpdateModelModal";
import DashboardTopBar from "@/components/layouts/DashboardTopBar";
import { RightPane } from "@/components";
import { useProjectInit } from "@/lib/client/hooks/useProject";
import { UserProject } from "@/types";
import prisma from "@/lib/server/prisma";

const Try = ({ project, error }: { project: UserProject; error: string }) => {
  const editor = useUIStore((state) => state.editor);
  const { globalLoader, setGlobalLoader } = useProjectInit(project);

  useEffect(() => {
    if (error?.length) {
      setGlobalLoader(false);
      window.location.assign("/try");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <MainLayout headTitle="Try visula" showHeader={false}>
      <ReactFlowProvider>
        <div className="flex w-full justify-between">
          <section className="relative w-full h-screen overflow-hidden">
            <DashboardTopBar
              showLoader={globalLoader}
              hideProjectTitle={editor === "code-editor"}
              project={{
                name: project?.name,
                lastUpdated: project?.updatedAt,
              }}
            />
            <NodesEditor showEditor={editor === "nodes-editor"} />
            <CodeEditor showEditor={editor === "code-editor"} />
          </section>

          <RightPane />
        </div>
        <UpdateModelModal />
      </ReactFlowProvider>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  project: any;
  error: any;
}> = async ({ query }) => {
  try {
    if (query?.id?.length) {
      const project = await prisma.projects.findFirstOrThrow({
        where: {
          id: query?.id as string,
        },
      });

      return {
        props: { project: JSON.parse(JSON.stringify(project)), error: false },
      };
    }

    const project = await prisma.projects.create({
      data: {
        name: "Test Project",
        description:
          "This is testing project, it will be delete in the next 12 hours.",
        projectStatus: "DUMMY",
      },
    });

    return {
      redirect: {
        permanent: false,
        destination: `/try?id=${project.id}`,
      },
      props: {},
    };
  } catch (error) {
    return {
      props: {
        project: {},
        error: "This project is not found",
      },
    };
  }
};

export default Try;
