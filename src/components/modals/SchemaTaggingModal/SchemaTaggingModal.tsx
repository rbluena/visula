import { useEffect, useState } from "react";
import Modal from "@/components/common/Modal/Modal";
import { useGlobalStore } from "@/lib/client/store/global";
import { useHistoryStore } from "@/lib/client/store/history";
import { TextInput, TextArea } from "@/components/form";
import { useForm } from "react-hook-form";
import { updateSchemaDetailsService } from "@/services/schemas";
import { useRouter } from "next/router";
import { isEmpty, omitBy } from "lodash";
import Spinner from "@/components/common/Spinner/Spinner";

const SchemaTaggingModal = () => {
  const { openedModal, setOpenedModal } = useGlobalStore((state) => state);
  const activeSchamaDetails = useHistoryStore(
    (state) => state.data[state.activeSchemaId || ""]
  );
  const { updateSchemaDetails, setActiveSchemaId } = useHistoryStore(
    (state) => state
  );
  const [isLoading, setIsLoading] = useState(false);

  const { query } = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm();

  const isSchemaTaggingModalOpen =
    openedModal === "schema-tagging" && activeSchamaDetails !== undefined;

  function onSubmit(data: any) {
    if (activeSchamaDetails.id) {
      setIsLoading(true);

      updateSchemaDetailsService(query.id as string, activeSchamaDetails.id, {
        ...omitBy(data, isEmpty),
      })
        .then((response) => {
          updateSchemaDetails(response.id, response);
          setIsLoading(false);
          setOpenedModal(null);
          setActiveSchemaId(null);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }

  function onModelClosed() {
    setOpenedModal(null);
    setActiveSchemaId(null);
  }

  useEffect(() => {
    setValue("name", activeSchamaDetails?.name);
    setValue("description", activeSchamaDetails?.description);
    setValue("tag", activeSchamaDetails?.tag);
  }, [activeSchamaDetails, setValue]);

  if (!isSchemaTaggingModalOpen) {
    null;
  }

  return (
    <Modal isOpen={isSchemaTaggingModalOpen} setIsOpen={onModelClosed}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextInput
            label="Title"
            placeholder="Enter title"
            required
            {...register("name")}
          />
        </div>

        <div className="max-w-xs">
          <TextInput
            label="Tag"
            placeholder="v1.2 or Production"
            {...register("tag")}
          />
        </div>

        <div>
          <TextArea
            label="Description"
            placeholder="Feel free to describe the changes has been made"
            {...register("description")}
          />
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full text-md  justify-center rounded-md bg-indigo-600 py-2 md:py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-60 disabled:bg-slate-400"
            disabled={isSubmitting || isLoading}
          >
            {isLoading ? <Spinner /> : "Submit"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SchemaTaggingModal;
