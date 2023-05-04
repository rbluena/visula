import { MainLayout, CodeEditor } from "@/components";

const dashboard = () => {
  // const [showCodeEditor, setShowCodeEditor] = useState(true);

  return (
    <MainLayout>
      <div className="flex overflow-hidden">
        <div className="md:w-[75%]">
          {/* {showCodeEditor ? <CodeEditor /> : <NodesEditor />} */}
          <CodeEditor />
        </div>
        <div className="w-[25%]">
          <div className="fixed border border-green-300 bottom-0 w-full p-2">
            <p>Right Footer</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default dashboard;
