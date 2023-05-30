import { useRouter } from "next/router";
import { shallow } from "zustand/shallow";
import Link from "next/link";
import { CloudArrowUpIcon, HomeIcon } from "@heroicons/react/24/outline";
import Spinner from "@/components/common/Spinner/Spinner";
import { getRelativeTime } from "@/lib/client/common/getTimeAgo";
import { useGlobalStore } from "@/lib/client/store/global";
import { useHistoryStore } from "@/lib/client/store/history";
import { saveSchemaHistoryService } from "@/services/schemas";
import { toast } from "react-hot-toast";

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
  const { setOpenedModal, setSavingLoader, isSaving } = useGlobalStore(
    (state) => ({
      setOpenedModal: state.setOpenedModal,
      isSaving: state.savingLoader,
      setSavingLoader: state.setGlobalSavingLoader,
    }),
    shallow
  );
  const { newLocalChanges, addSchema } = useHistoryStore(
    (state) => ({
      newLocalChanges: state.newLocalChanges,
      addSchema: state.addSchema,
    }),
    shallow
  );
  const { query } = useRouter();

  async function saveSchemaChanges() {
    setSavingLoader(true);
    try {
      const schema = {
        models: JSON.parse(
          sessionStorage.getItem("visula-schema-models") || "{}"
        )?.state,
        fields: JSON.parse(
          sessionStorage.getItem("visula-schema-fields") || "{}"
        )?.state,
        relations: JSON.parse(
          sessionStorage.getItem("visula-schema-relations") || "{}"
        )?.state,
      };

      const responseData = await saveSchemaHistoryService(query.id as string, {
        schema,
      });

      addSchema(responseData);
      setSavingLoader(false);
      toast.success("New schema was created.");
    } catch (error) {
      setSavingLoader(false);
    }
  }

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
                className="flex flex-col items-start py-2 px-4 space-y-0 bg-slate-100 hover:bg-violet-100 rounded-md border-2 border-indigo-400"
              >
                <h1 className="text-md font-semibold text-slate-600 max-w-[124px] overflow-clip whitespace-nowrap overflow-ellipsis">
                  {project?.name}
                </h1>
                <div className="text-indigo-700 text-xs">
                  <strong>Update:</strong>&nbsp;
                  {getRelativeTime(project.lastUpdated)}
                </div>
              </button>
            </>
          )}

          <button
            title="Save changes"
            // disabled={!newLocalChanges || !isSaving}
            disabled={!newLocalChanges || isSaving}
            className="bg-indigo-400 text-slate-50 font-bold disabled:bg-indigo-50 disabled:text-slate-400  flex items-center text-sm justify-center rounded p-2 border border-indigo-200 hover:opacity-80"
            onClick={saveSchemaChanges}
          >
            {isSaving ? (
              <Spinner className="w-5 h-5" />
            ) : (
              <CloudArrowUpIcon className="w-5 h-5" />
            )}

            {newLocalChanges ? <span>&nbsp;Save *</span> : null}
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardTopBar;
