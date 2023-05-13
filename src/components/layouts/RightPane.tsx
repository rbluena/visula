import { useState } from "react";
import RightModelPane from "../RightPaneModels";
import RightPaneTemplates from "../RightPageTemplates";
import RightPaneGeneratedCode from "../RightPaneGeneratedCode";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline";
import { useGlobalStore } from "@/lib/client/store/global";

const RightPane = () => {
  const [toggleSidebarExpansion, setToggleSidebarExpansion] = useState(true);
  const [showMultipleModels, setshowMultipleModels] = useState(true);
  const { isGeneratedCodeOpen } = useGlobalStore((state) => state);

  const [paneSwitch, setPaneSwitch] = useState<"models" | "templates" | string>(
    "models"
  );

  return (
    <aside
      className={`w-[460px] fixed ${
        toggleSidebarExpansion ? "right-[0px]" : "right-[-450px]"
      } h-screen bg-slate-100 border-l border-slate-200 shadow-xl transition-all`}
    >
      {!isGeneratedCodeOpen ? (
        <div className="min-h-[50px] bg-white border-b border-b-violet-100">
          {paneSwitch === "models" || paneSwitch === "templates" ? (
            <div className="p-2 px-4 flex items-center justify-between">
              {/* <div>{paneSwitch === "models" ? "Models" : "Templates"}</div> */}
              <select
                className="bg-slate-100 py-1 text-sm rounded-md border text-slate-800"
                onChange={(evt) => setPaneSwitch(evt.target.value)}
              >
                <option value="models">Models</option>
                <option value="templates">Templates</option>
                {/* <option value="docume">Documentation</option> */}
              </select>
              <label
                className="text-sm flex items-center text-slate-500"
                htmlFor="miltiple-models"
              >
                All models&nbsp;
                <input
                  id="miltiple-models"
                  className="w-5 h-5 rounded"
                  type="checkbox"
                  checked={showMultipleModels}
                  onChange={() => setshowMultipleModels(!showMultipleModels)}
                />
              </label>
            </div>
          ) : null}
        </div>
      ) : null}

      {isGeneratedCodeOpen ? <RightPaneGeneratedCode /> : null}

      {paneSwitch === "templates" && !isGeneratedCodeOpen ? (
        <RightPaneTemplates />
      ) : null}
      {paneSwitch === "models" && !isGeneratedCodeOpen ? (
        <RightModelPane showMultipleModels={showMultipleModels} />
      ) : null}

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
