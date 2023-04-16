import { useState } from "react";
import { useNodesStore } from "@/lib/client/store/nodes";
import RightModelPane from "../RightPaneModels/RightModelPane";
import RightPaneTemplates from "../RightPageTemplates/RightPaneTemplates";

const RightPane = () => {
  const { data } = useNodesStore((state) => state);
  const modelsData = Object.keys(data).map((key) => data[key]);
  const [paneSwitch, setPaneSwitch] = useState<"model" | "templates">("model");

  return (
    <aside className="w-[460px] fixed right-0 max-h-screen bg-white border-l border-slate-200">
      <div className="min-h-[50px] bg-slate-100">
        <div className="p-2 px-4 flex items-center">
          <div>{paneSwitch === "model" ? "Models" : "Templates"}</div>
        </div>
      </div>
      {paneSwitch === "templates" ? (
        <RightPaneTemplates />
      ) : (
        <RightModelPane modelsData={modelsData} />
      )}
    </aside>
  );
};

export default RightPane;
