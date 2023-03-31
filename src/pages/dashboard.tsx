import { MainLayout, CodeEditor } from "@/components";

const dashboard = () => {
  return (
    <MainLayout>
      <aside className="h-screen absolute left-0 top-0 w-[460px]  bg-gray-50">
        <CodeEditor />
      </aside>
    </MainLayout>
  );
};

export default dashboard;
