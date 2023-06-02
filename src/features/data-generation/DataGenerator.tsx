// import { useState } from "react";
import { isEmpty } from "lodash";
// import { useHistoryStore } from "@/lib/client/store/history";
import useModels from "@/lib/client/hooks/useModels";
import { Button } from "@/components/form";
import { useForm } from "react-hook-form";
import useModelField from "@/lib/client/hooks/useModelFields";
import { useEffect, useState } from "react";
import FieldGenComponent from "./components/FieldGenComponent";

const DataGenerator = () => {
  // const [selectedValue, setSelectedValue] = useState<any>("");
  // const activeSchemaId = useHistoryStore((state) => state.activeSchemaId);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const { selectedActiveModel: activeModel } = useModels();
  const { getModelFields } = useModelField();
  const { register, handleSubmit } = useForm();

  const fields = getModelFields(selectedFields);

  /**
   *
   */
  function removeField(id: string) {
    setSelectedFields((state) => state.filter((item) => item !== id));
  }

  function onSubmit(data: any) {
    console.log(data);
  }

  useEffect(() => {
    if (activeModel?.fields?.length) {
      setSelectedFields(activeModel?.fields || []);
      return;
    }

    setSelectedFields([]);
  }, [activeModel?.fields]);

  if (isEmpty(activeModel)) {
    return null;
  }

  return (
    <div className="bg-slate-50 h-full">
      {/* START: Header */}
      <div className="w-full h-[50px] border-b border-b-slate-100 flex items-center px-4">
        <div>
          <h2 className="text-2xl font-semibold">{activeModel.name}</h2>
        </div>
        <div className="ml-auto h-full min-w-[400px] flex items-center flex-row-reverse px-4 gap-2">
          <Button>Close</Button>
          <Button>Generate</Button>
          <select name="" id="">
            <option value={10}>5</option>
            <option value={10}>10</option>
            <option value={10}>25</option>
            <option value={10} disabled>
              50
            </option>
            <option value={10} disabled>
              100
            </option>
          </select>
        </div>
      </div>
      {/* END: Header */}

      {/* <div className="w-[450px] bg-slate-100"></div> */}
      <div className="bg-white w-full overflow-y-auto h-full py-10 pt-5">
        <form onSubmit={handleSubmit(onSubmit)} className="divide-y">
          {fields?.map((field) => (
            <FieldGenComponent
              key={field.id}
              field={field}
              register={register}
              removeField={removeField}
            />
          ))}
        </form>
      </div>
    </div>
  );
};

export default DataGenerator;
