import { ReactFlowProvider } from "reactflow";
import { MainLayout, NodesEditor, CodeEditor } from "@/components";
import { useUIStore } from "@/lib/client/store/ui";
import DashboardTopBar from "@/components/layouts/DashboardTopBar";

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

          <aside className="w-[360px] h-screen overflow-hidden bg-white border-l border-slate-200">
            <h2>White tale</h2>
          </aside>
        </div>
      </ReactFlowProvider>
    </MainLayout>
  );
};

export default Try;
