import { getRelativeTime } from "@/lib/client/common/getTimeAgo";
import { EyeIcon, TagIcon, TrashIcon } from "@heroicons/react/24/outline";
import { MouseEventHandler } from "react";

type Props = {
  name: string;
  version?: string;
  description?: string;
  createdDate: Date;
  showSchema: MouseEventHandler;
  openSchemaTaggingModal: MouseEventHandler;
  deleteSchemaHistory: MouseEventHandler;
};

const Card = ({
  name,
  version,
  description = "",
  createdDate,
  showSchema,
  openSchemaTaggingModal,
  deleteSchemaHistory,
}: Props) => {
  return (
    <div className={`shadow-sm ${version?.length ? "bg-white" : "bg-white"}`}>
      <div className="px-4 py-4  space-y-2 text-left">
        <div className="flex w-full justify-between">
          <div>
            <h2 className="text-sm font-semibold leading-tight">{name}</h2>
            {version ? (
              <span className="bg-indigo-500 text-white text-xs  shadow-inner font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                {version}
              </span>
            ) : null}
          </div>

          <div className="flex items-center gap-1">
            <button
              className="border border-slate-300 rounded-full p-1 bg-indigo-50 hover:bg-green-100 text-indigo-700"
              onClick={showSchema}
              title="View models"
            >
              <EyeIcon className="w-4 h-4" />
            </button>
            <button
              className="border border-slate-300 rounded-full p-1 bg-slate-50 hover:bg-slate-100 text-slate-700"
              title="Tag this schema"
              onClick={openSchemaTaggingModal}
              aria-describedby="aria-version-tag"
            >
              <span id="aria-version-tag" className="sr-only">
                Tag this schema
              </span>
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
        <p className="text-xs font-semibold text-slate-600">
          {getRelativeTime(createdDate)}
        </p>
      </div>
    </div>
  );
};

export default Card;
