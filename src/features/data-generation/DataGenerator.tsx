import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import isEmpty from "lodash/isEmpty";
import omitBy from "lodash/omitBy";
import isNil from "lodash/isNil";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useModels from "@/lib/client/hooks/useModels";
import { Button } from "@/components/form";
import useModelField from "@/lib/client/hooks/useModelFields";
import { generateSchemaContent } from "@/services/generator";
import { useHistoryStore } from "@/lib/client/store/history";
import { Spinner } from "@/components";
import FieldGenComponent from "./components/FieldGenComponent";
import DataTable from "./components/DataTable";
import { useGeneratorStore } from "./store";
import { useDataGenerator } from "./hooks";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useGlobalStore } from "@/lib/client/store/global";

const DataGenerator = () => {
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [totalCount, setTotalCount] = useState("10");
  const [isGenerating, setIsGenerating] = useState(false);
  const {
    selectedActiveModel: activeModel,
    getModelsData,
    onSelectingModel,
  } = useModels();
  const addGeneratedData = useGeneratorStore((state) => state.addGeneratedData);
  const setBottomSheetStatus = useGlobalStore(
    (state) => state.setBottomSheetOpenStatus
  );
  const { getModelGeneratedData, getGridData } = useDataGenerator();
  const activeSchemaId = useHistoryStore((state) => state.activeSchemaId);
  const { getModelFields } = useModelField();
  const { register, handleSubmit, control } = useForm();

  const { query } = useRouter();

  const allModels = getModelsData();

  const fields = getModelFields(selectedFields);

  const submitRef = useRef<HTMLButtonElement>(null);

  const generatedData = getModelGeneratedData(activeModel.id);
  const gridData = getGridData(fields, generatedData?.data);

  /**
   *
   */
  function removeField(id: string) {
    setSelectedFields((state) => state.filter((item) => item !== id));
  }

  /**
   *
   * @param data
   */
  async function onSubmit(data: any) {
    let newObj = { ...omitBy(data, isNil) };

    for (const prop in newObj) {
      if (Object.prototype.hasOwnProperty.call(newObj, prop)) {
        const element = data[prop];

        newObj[prop] = {
          ...element,
          dataType: null,
        };
      }
    }

    try {
      setIsGenerating(true);
      const payload = {
        modelId: activeModel.modelId,
        totalCount: parseInt(totalCount, 10),
        data: {
          ...newObj,
        },
      };

      const genData = await generateSchemaContent(query.id as string, payload);
      addGeneratedData(activeModel.id, activeSchemaId as string, genData);
      setIsGenerating(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      setIsGenerating(false);
    }
  }

  useEffect(() => {
    if (activeModel?.fields?.length) {
      setSelectedFields(activeModel?.fields || []);
      return;
    }

    setSelectedFields([]);
  }, [activeModel?.fields]);

  return (
    <div className="bg-slate-50 h-full">
      {/* START: Header */}
      <div className="w-full h-[50px] border-b border-b-slate-100 flex items-center px-4">
        {allModels?.length ? (
          <div className="flex gap-2 items-center">
            <select
              className="min-w-[100px] text-sm p-1.5 rounded-md border border-slate-300 bg-slate-50"
              onChange={(evt) => onSelectingModel(evt.target.value)}
              placeholder="Select model"
              value={activeModel.id}
            >
              <option disabled>Select model</option>
              {allModels?.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
            {/* <h2 className="text-xl">Model</h2> */}
          </div>
        ) : (
          <p className="text-slate-500 font-semibold">No model created</p>
        )}

        <div className="ml-auto h-full min-w-[400px] flex items-center flex-row-reverse px-4 gap-2">
          <Button
            variant="danger"
            size="sm"
            onClick={() => setBottomSheetStatus("closed")}
          >
            <span className="sr-only">Close bottom sheet</span>
            <XMarkIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="primary"
            modifier="outline"
            className="min-w-[100px]"
            size="sm"
            onClick={() => {
              submitRef.current?.click();
            }}
          >
            {isGenerating ? <Spinner className="w-4 h-4" /> : "Generate"}
          </Button>
          <select
            className="min-w-[100px] text-sm p-1.5 rounded-md border leading-loose border-slate-300 bg-slate-50"
            onChange={(evt) => setTotalCount(evt.target.value)}
            value={totalCount}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50" disabled>
              50
            </option>
            <option value="100" disabled>
              100
            </option>
            <option value="1000" disabled>
              1000
            </option>
          </select>
        </div>
      </div>
      {/* END: Header */}

      {/* START: FIELDS AND SELECTING DATA TYPE */}
      <div className="w-full h-full bg-white">
        {!isEmpty(activeModel) ? (
          <div className="w-full flex h-full">
            <div className=" w-[400px]">
              <form onSubmit={handleSubmit(onSubmit)} className="divide-y">
                {fields?.map((field) => (
                  <FieldGenComponent
                    key={field.id}
                    field={field}
                    modelId={activeModel?.modelId}
                    control={control}
                    register={register}
                    removeField={removeField}
                  />
                ))}

                <Button ref={submitRef} type="submit" hidden>
                  Submit
                </Button>
              </form>
            </div>

            {/* START: TABLE */}
            <div className="w-full h-full overflow-auto">
              {!isGenerating && !isEmpty(gridData) ? (
                <DataTable gridData={gridData} />
              ) : null}

              {isGenerating ? (
                <div className="w-full h-full grid place-items-center">
                  <Spinner className="w-8 h-8" />
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
        {/* END: FIELDS AND SELECTING DATA TYPE */}
      </div>
    </div>
  );
};

export default DataGenerator;
