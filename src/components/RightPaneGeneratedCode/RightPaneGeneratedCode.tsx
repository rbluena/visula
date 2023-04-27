import { useGlobalStore } from "@/lib/client/store/global";
import { ClipboardDocumentIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Prism from "../common/Prism";

const RightPaneGeneratedCode = () => {
  const { generatedCode, openGeneratedCode } = useGlobalStore((state) => state);

  async function copyCodeContent() {
    if (window) {
      try {
        window?.navigator.clipboard.writeText(generatedCode);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="h-full overflow-y-hidden">
      <div className="top-0 z-40 p-2 space-x-1 bg-white w-full">
        <button
          onClick={copyCodeContent}
          className="rounded border-2 border-violet-400 p-1 bg- text-violet-800 hover:bg-violet-200"
          title="Copy code from editor"
        >
          <span className="sr-only">Copy code from editor</span>
          <ClipboardDocumentIcon strokeWidth={1.2} className="w-6 h-6" />
        </button>
        <button
          onClick={() => openGeneratedCode(false)}
          className="border-2 border-red-300 p-1 bg-white rounded hover:bg-red-100 text-red-800"
          title="Close code editor"
        >
          <span className="sr-only">Close code editor</span>
          <XMarkIcon strokeWidth={1.2} className="w-6 h-6" />
        </button>
      </div>
      <Prism code={generatedCode} />
    </div>
  );
};

export default RightPaneGeneratedCode;
