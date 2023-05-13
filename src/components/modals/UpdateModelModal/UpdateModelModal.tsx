import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "@/components/common/Modal";
import { useGlobalStore } from "@/lib/client/store/global";
import Spinner from "@/components/common/Spinner";
import { useModelStore } from "@/lib/client/store/models";
import TextInput from "@/components/form/TextInput";
import useModels from "@/lib/client/hooks/useModels";

type FormData = {
  name: string;
  modelId: string;
};

const UpdateModelModal = () => {
  const { openedModal, setOpenedModal } = useGlobalStore((state) => state);
  const { updateModelData } = useModels();
  const [showSpinner, setShowSpinner] = useState(false);
  const activeModel = useModelStore(
    (state) => state.data[state.activeModelId || ""]
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isDirty, isValid },
  } = useForm<FormData>();

  // console.log(activeModel);

  function onSubmit(data: FormData) {
    setShowSpinner(true);
    updateModelData({
      ...activeModel,
      name: data.name,
      modelId: data.modelId,
    });

    setShowSpinner(false);

    setOpenedModal(null);
  }

  function onModalClosed() {
    setOpenedModal(null);
  }

  useEffect(() => {
    setValue("name", activeModel?.name || "");
    setValue("modelId", activeModel?.modelId || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeModel]);

  return (
    <Modal
      title="Update model"
      isOpen={openedModal === "model-update"}
      setIsOpen={onModalClosed}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="divide-y divide-violet-200 sm:mx-auto sm:w-full sm:max-w-sm"
      >
        <div className="text-sm space-y-2 py-2">
          {showSpinner ? <Spinner className="w-8 h-8" /> : null}
          <TextInput
            label="Name"
            type="text"
            placeholder="Name"
            defaultValue={activeModel?.name}
            {...register("name")}
          />
          <TextInput
            label="Model ID"
            type="text"
            placeholder="Model ID"
            defaultValue={activeModel?.modelId}
            pattern="^\S*$"
            {...register("modelId")}
          />
        </div>

        <div className="py-2">
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-60 disabled:bg-slate-400"
            disabled={!isValid || !isDirty}
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateModelModal;
