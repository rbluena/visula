import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/outline";
import ToggleGroup from "@/components/form/ToggleGroup/ToggleGroup";

const DashboardTopBar = () => {
  return (
    <div className="flex justify-between items-center px-4 absolute w-screen top-4">
      <div className="flex items-start space-x-2">
        <Link
          href="/"
          className="bg-slate-200 flex items-center justify-center rounded p-2"
        >
          <HomeIcon className="text-lg w-6 h-6 font-semibold" />
        </Link>

        <div className="flex flex-col items-start py-2 px-4 space-y-0 bg-slate-100 rounded-md border-2 border-slate-300">
          <h1 className="text-lg">Project Name</h1>
          <div className="text-slate-700 text-xs">
            <strong>Last update: </strong>June 2, 2023&nbsp;&nbsp;10:00am
          </div>
        </div>
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
