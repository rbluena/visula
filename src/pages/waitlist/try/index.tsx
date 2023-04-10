import { ReactFlowProvider } from "reactflow";
import { MainLayout, NodesEditor, CodeEditor } from "@/components";
import { useUIStore } from "@/lib/client/store/ui";
import DashboardTopBar from "@/components/layouts/DashboardTopBar";
import { RightPane } from "@/components";

const Try = () => {
  const editor = useUIStore((state) => state.editor);

  return (
    <MainLayout headTitle="Try visula" showHeader={false}>
      <ReactFlowProvider>
        <div className="flex w-full justify-between">
          <section className="relative w-full h-screen overflow-hidden">
            <DashboardTopBar hideProjectTitle={editor === "code-editor"} />
            <NodesEditor showEditor={editor === "nodes-editor"} />{" "}
            <CodeEditor showEditor={editor === "code-editor"} />
          </section>

          <RightPane />
        </div>
      </ReactFlowProvider>
    </MainLayout>
  );
};

export default Try;
