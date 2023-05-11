import { NextApiRequest } from "next";
import { ReactFlowProvider } from "reactflow";
import { MainLayout, NodesEditor, CodeEditor } from "@/components";
import { useUIStore } from "@/lib/client/store/ui";
import UpdateModelModal from "@/components/modals/UpdateModelModal";
import DashboardTopBar from "@/components/layouts/DashboardTopBar";
import { RightPane } from "@/components";
import { useProjectInit } from "@/lib/client/hooks/useProject";
import { UserProject } from "@/types";
import prisma from "@/lib/server/prisma";
import { useEffect } from "react";

const Try = ({ project, error }: { project: UserProject; error: string }) => {
  const editor = useUIStore((state) => state.editor);
  const { showLoader } = useProjectInit(project);

  useEffect(() => {
    if (error?.length) {
      // TODO: Show error
    }
  }, [error]);

  return (
    <MainLayout headTitle="Try visula" showHeader={false}>
      <ReactFlowProvider>
        <div className="flex w-full justify-between">
          <section className="relative w-full h-screen overflow-hidden">
            <DashboardTopBar
              showLoader={showLoader}
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

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  let project = {};

  try {
    if (req.query?.id?.length) {
      project = await prisma.projects.findFirstOrThrow({
        where: {
          id: req.query?.id as string,
        },
      });
    } else {
      project = await prisma.projects.create({
        data: {
          name: "Test Project",
          description:
            "This is testing project, it will be delete in the next 12 hours.",
          projectStatus: "DUMMY",
        },
      });
    }

    return {
      props: { project: JSON.parse(JSON.stringify(project)), error: false },
    };
  } catch (error) {
    return {
      props: {
        project,
        error: "This project is not found",
      },
    };
  }
}

export default Try;
