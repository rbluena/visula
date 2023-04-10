import { TrashIcon } from "@heroicons/react/24/outline";

const ModelFields = ({ data = {} }: any) => {
  return (
    <div className="">
      <div key={data.id} className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <input
            type="text"
            className="bg-slate-50 text-xs p-1 border border-slate-200 rounded-md"
            value={data.name}
          />
          <select
            id={data.id}
            className="bg-slate-50 text-xs p-1 border border-slate-200 rounded-md"
            value={data.dataType}
          >
            <option value="String">String</option>
            <option value="Int">Int</option>
            <option value="Relation">Relation</option>
            <option value="Media">Media</option>
          </select>
          <button className="bg-blue-700 text-white text-xs font-semibold px-2 py-1 rounded-md">
            Save
          </button>
          <button className="border border-slate-300 rounded-full p-1 bg-red-50 hover:bg-red-100 text-red-700">
            <TrashIcon strokeWidth={1} className="w-4 h-4" />
          </button>
        </div>

        <div>
          {/* <button className="border border-slate-300 rounded-full p-1 bg-red-50 hover:bg-red-100 text-red-700">
            <TrashIcon strokeWidth={1} className="w-4 h-4" />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ModelFields;
