import { useNodesStore } from "@/lib/client/store/nodes";
import RightModelPane from "../RightPaneModels/RightModelPane";

const RightPane = () => {
  const { data } = useNodesStore((state) => state);
  const modelsData = Object.keys(data).map((key) => data[key]);

  return (
    <aside className="w-[460px] fixed right-0 max-h-screen bg-white border-l border-slate-200">
      <div className="min-h-[50px] bg-slate-100">
        <div>Templates</div>
      </div>
      <RightModelPane modelsData={modelsData} />
    </aside>
  );
};

export default RightPane;
