import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import ToggleGroup from "@/components/form/ToggleGroup/ToggleGroup";

const DashboardTopBar = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <button className="bg-slate-200 flex items-center justify-center rounded">
          <ChevronLeftIcon className="text-lg w-8 h-8 font-semibold" />
        </button>
      </div>

      <div>
        <ToggleGroup
          onChange={console.log}
          defaultValue="node-editor"
          items={[
            {
              label: "Nodes",
              value: "node-editor",
              aria: "Switch to node editor",
            },
            {
              label: "Code",
              value: "code-editor",
              aria: "Switch to code editor",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default DashboardTopBar;
