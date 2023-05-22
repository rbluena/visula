import { getRelativeTime } from "@/lib/client/common/getTimeAgo";
import {
  TableCellsIcon,
  TagIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { MouseEventHandler } from "react";

type Props = {
  name: string;
  version?: string;
  description?: string;
  createdDate: Date;
  showSchema: MouseEventHandler;
  deleteSchemaHistory: MouseEventHandler;
};

const Card = ({
  name,
  version,
  description = "",
  createdDate,
  showSchema,
  deleteSchemaHistory,
}: Props) => {
  return (
    <div className={`shadow-sm ${version?.length ? "bg-white" : "bg-white"}`}>
      <div className="px-4 py-2  space-y-2 text-left">
        <div className="flex w-full justify-between">
          <div>
            <h2 className="text-sm font-semibold leading-tight">{name}</h2>
            {version ? (
              <span className="text-[12px] text-slate-400">v{version}</span>
            ) : null}
          </div>

          <div className="flex items-center gap-1">
            <button
              className="border border-slate-300 rounded-full p-1 bg-green-50 hover:bg-green-100 text-green-700"
              onClick={showSchema}
              title="Show schema"
            >
              <TableCellsIcon className="w-4 h-4" />
            </button>
            <button
              className="border border-slate-300 rounded-full p-1 bg-green-50 hover:bg-violet-100 text-violet-700"
              title="Tag with version number"
              // onClick={() => setShowTaggingInputs(true)}
            >
              <TagIcon className="w-4 h-4" />
            </button>
            <button
              aria-describedby="aria-version-delete"
              className="border border-slate-300 rounded-full p-1 bg-red-50 hover:bg-red-100 text-red-700"
              title="Delete this schema"
              onClick={deleteSchemaHistory}
            >
              <TrashIcon className="w-4 h-4" />
              <span id="aria-version-delete" className="sr-only">
                Remove this version
              </span>
            </button>
          </div>
        </div>

        <p className="text-sm font-light max-w-[90%]">{description}</p>
        <p className="text-xs text-violet-600">
          {getRelativeTime(createdDate)}
        </p>
      </div>
    </div>
  );
};

export default Card;
