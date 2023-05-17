import { GetServerSideProps } from "next";
import { ReactFlowProvider } from "reactflow";
import prisma from "@/lib/server/prisma";
import { MainLayout, NodesEditor, CodeEditor } from "@/components";
import { useUIStore } from "@/lib/client/store/ui";
import UpdateModelModal from "@/components/modals/UpdateModelModal";
import DashboardTopBar from "@/components/layouts/DashboardTopBar";
import { RightPane } from "@/components";
import { useProject, useProjectInit } from "@/lib/client/hooks/useProject";
import { UserProject } from "@/types";

const Try = ({ project }: { project: UserProject; error: string }) => {
  const editor = useUIStore((state) => state.editor);
  const { globalLoader } = useProjectInit(project); // Project when page is loaded
  const { activeProject } = useProject();

  return (
    <MainLayout headTitle="Try visula" showHeader={false}>
      <ReactFlowProvider>
        <div className="flex w-full justify-between">
          <section className="relative w-full h-screen overflow-hidden">
            <DashboardTopBar
              showLoader={globalLoader}
              hideProjectTitle={editor === "code-editor"}
              project={{
                name: activeProject?.name,
                lastUpdated: activeProject?.updatedAt,
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
      const project = await prisma.project.findFirstOrThrow({
        where: {
          id: query?.id as string,
        },
      });

      return {
        props: { project: JSON.parse(JSON.stringify(project)), error: false },
      };
    } else {
      const project = await prisma.project.create({
        data: {
          name: "Dummy project",
          description:
            "This is a dummy project and will be  deleted in the next 24hrs",
          projectStatus: "DUMMY",
        },
      });

      return {
        redirect: {
          permanent: false,
          destination: `/try?id=${project.id}`,
        },
      };
    }
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Try;
