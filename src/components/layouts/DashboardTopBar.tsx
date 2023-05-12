import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/outline";
import Spinner from "@/components/common/Spinner/Spinner";
import { getRelativeTime } from "@/lib/client/common/getTimeAgo";
import { useGlobalStore } from "@/lib/client/store/global";
// import ToggleGroup from "@/components/form/ToggleGroup/ToggleGroup";
// import { useUIStore } from "@/lib/client/store/ui";

type Props = {
  hideProjectTitle: boolean;
  showLoader?: boolean;
  project?: {
    name?: string;
    lastUpdated?: Date;
  };
};

const DashboardTopBar = ({
  hideProjectTitle = false,
  showLoader = true,
  project = {},
}: Props) => {
  const setOpenedModal = useGlobalStore((state) => state.setOpenedModal);

  return (
    <div className="flex justify-between items-start px-4 absolute w-full top-4 z-20 pointer-events-none">
      {hideProjectTitle ? (
        <span />
      ) : (
        <div className="flex items-start space-x-2 pointer-events-auto">
          <Link
            href="/"
            className="bg-slate-100  flex items-center justify-center rounded p-2 hover:bg-violet-100"
          >
            <HomeIcon className="text-lg w-6 h-6 font-semibold" />
          </Link>

          {showLoader ? (
            <Spinner className="w-6 h-6" />
          ) : (
            <>
              <button
                onClick={() => setOpenedModal("project-settings")}
                className="flex flex-col items-start py-2 px-4 space-y-0 bg-slate-100 hover:bg-violet-100 rounded-md border-2 border-violet-400"
              >
                <h1 className="text-md font-semibold text-slate-600 max-w-[124px] overflow-clip whitespace-nowrap overflow-ellipsis">
                  {project?.name}
                </h1>
                <div className="text-violet-700 text-xs">
                  <strong>Update:</strong>&nbsp;
                  {getRelativeTime(project.lastUpdated)}
                </div>
              </button>
            </>
          )}
        </div>
      )}

      {/* <div className="pointer-events-auto">
        <ToggleGroup
          onChange={switchModelEditor}
          value={editor}
          defaultValue="nodes-editor"
          items={[
            {
              label: "Nodes",
              value: "nodes-editor",
              aria: "Switch to node editor",
            },
            {
              label: "Code",
              value: "code-editor",
              aria: "Switch to code editor",
            },
          ]}
        />
      </div> */}
    </div>
  );
};

export default DashboardTopBar;
