import { ReactFlowProvider } from "reactflow";
import { MainLayout, NodesEditor, CodeEditor } from "@/components";
import { useUIStore } from "@/lib/client/store/ui";
import DashboardTopBar from "@/components/layouts/DashboardTopBar";
import { RightPane } from "@/components";
import { useProject, useProjectInit } from "@/lib/client/hooks/useProject";

const Try = () => {
  const editor = useUIStore((state) => state.editor);
  const { showLoader } = useProjectInit(true);
  const { activeProject } = useProject();

  return (
    <MainLayout headTitle="Try visula" showHeader={false}>
      <div className="flex w-full justify-between">
        <ReactFlowProvider>
          <section className="relative w-full h-screen overflow-hidden">
            <DashboardTopBar
              showLoader={showLoader}
              hideProjectTitle={editor === "code-editor"}
              project={{
                title: activeProject?.title,
                lastUpdated: activeProject?.lastUpdate,
              }}
            />
            <NodesEditor showEditor={editor === "nodes-editor"} />{" "}
            <CodeEditor showEditor={editor === "code-editor"} />
          </section>

          <RightPane />
        </ReactFlowProvider>
      </div>
    </MainLayout>
  );
};

export default Try;
