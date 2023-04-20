import { useState } from "react";
import { useNodesStore } from "@/lib/client/store/nodes";
import RightModelPane from "../RightPaneModels/RightModelPane";
import RightPaneTemplates from "../RightPageTemplates/RightPaneTemplates";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline";

const RightPane = () => {
  const [toggleSidebarExpansion, setToggleSidebarExpansion] = useState(false);
  const [showMultipleModels, setshowMultipleModels] = useState(false);

  const { data } = useNodesStore((state) => state);
  const modelsData = Object.keys(data).map((key) => data[key]);
  const [paneSwitch, setPaneSwitch] = useState<
    "models" | "templates" | "documentation" | string
  >("models");

  return (
    <aside
      className={`w-[460px] fixed ${
        toggleSidebarExpansion ? "right-[0px]" : "right-[-450px]"
      } h-screen bg-slate-100 border-l border-slate-200 shadow-xl transition-all`}
    >
      <div className="min-h-[50px] bg-white border-b border-b-violet-100">
        <div className="p-2 px-4 flex items-center">
          {/* <div>{paneSwitch === "models" ? "Models" : "Templates"}</div> */}
          <select
            className="bg-slate-100 py-1 text-sm rounded-md border text-slate-800"
            onChange={(evt) => setPaneSwitch(evt.target.value)}
          >
            <option value="models">Models</option>
            <option value="templates">Templates</option>
            {/* <option value="docume">Documentation</option> */}
          </select>
        </div>
      </div>
      {paneSwitch === "templates" ? (
        <RightPaneTemplates />
      ) : (
        <RightModelPane
          modelsData={modelsData}
          showMultipleModels={showMultipleModels}
        />
      )}

      <div className="absolute top-0 h-screen w-[60px] left-[-60px] overflow-hidden">
        <button
          onClick={() => setToggleSidebarExpansion(!toggleSidebarExpansion)}
          className="rounded fixed bottom-0 ml-2 mb-3 flex items-center justify-center bg-violet-600 text-white hover:opacity-75 p-2 shadow-md"
        >
          <ChevronDoubleLeftIcon
            className={`w-8 h-8 ${toggleSidebarExpansion ? "rotate-180" : ""}`}
          />
        </button>
      </div>
    </aside>
  );
};

export default RightPane;
