import { useState } from "react";
import * as ToggleGroupComponent from "@radix-ui/react-toggle-group";
import Modal from "@/components/common/Modal/Modal";
import Spinner from "@/components/common/Spinner/Spinner";
import { useGlobalStore } from "@/lib/client/store/global";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import {
  deployModelService,
  generateMigrationCodeService,
} from "@/services/schemas";
import { useRouter } from "next/router";
import { useHistoryStore } from "@/lib/client/store/history";
import prepeareModelToDeploy from "@/lib/client/common/prepareModelToDeploy";
import { useModelStore } from "@/lib/client/store/models";

let queue: string[] = [];

const SchemaDeploymentModal = () => {
  const { openedModal, setOpenedModal } = useGlobalStore((state) => state);
  const activeSchemaId = useHistoryStore((state) => state.activeSchemaId);
  const modelIds = useModelStore((state) => state.modelIds);
  const [showLoader, setShowLoader] = useState(false);
  const [active, setActive] = useState<"contentful" | "sanity">("contentful");
  const { query } = useRouter();

  queue = modelIds.slice();

  // const queueRef = useRef<string[] | null>(null);

  const isModalOpen = openedModal === "deploy" || openedModal === "migration";

  async function confirmedProgress() {
    console.log("Called");

    try {
      if (openedModal === "deploy") {
        if (queue.length === 0) {
          return;
        }

        while (queue.length) {
          let currentModelId = queue.shift();
          let deployingModel = prepeareModelToDeploy(
            currentModelId as string,
            !queue.length
          );

          const result = await deployModelService(query.id as string, {
            model: deployingModel,
            cmsType: active,
          });

          console.log(result);
        }
      }

      if (openedModal === "migration") {
        // Do the migration
        await generateMigrationCodeService(query.id as string, {
          schemaId: activeSchemaId as string,
          cmsType: active,
        });
      }
      // setShowLoader(false);
    } catch (error) {
      // Error
      console.log(error);
      // setShowLoader(false);
    }
  }

  return (
    <Modal isOpen={isModalOpen} setIsOpen={() => setOpenedModal(null)}>
      <div className="divide-y divide-violet-200">
        <div className="w-full">
          <h1 className="text-lg leading-5 pb-2 font-semibold">
            {openedModal === "migration" ? "Create migration" : "Deploy schema"}
          </h1>
        </div>
        <div className="pt-3">
          <p className="text-sm text-slate-500 flex items-start gap-1">
            <InformationCircleIcon className="w-5 h-5" />
            {openedModal === "deploy" && active === "contentful" ? (
              <span>
                You are about to deploy schema to a contentful environment. The
                deployment will lead to content types being modified and
                contents being deleted. Please confirm to continue.
              </span>
            ) : null}

            {openedModal === "migration" && active === "contentful" ? (
              <span>
                You are about to create migration code for contentful CMS, this
                action will not affect your contentful environment.
              </span>
            ) : null}
          </p>

          <ToggleGroupComponent.Root
            type="single"
            defaultValue="contenful"
            onValueChange={(value) => setActive(value as typeof active)}
            value={active || ""}
          >
            {[
              { value: "contentful", label: "Contentful", disabled: false },
              { value: "sanity", label: "Sanity", disabled: true },
            ].map((item) => (
              <ToggleGroupComponent.Item
                disabled={item.disabled}
                key={item.value}
                value={item.value}
                className="h-[120px] w-[120px] border-4 border-slate-200 leading-4 data-[state=on]:bg-white data-[state=on]:border-violet-500 data-[state=on]:text-violet-800 disabled:hover:border-slate-200 hover:border-violet-400 active:border-violet-400 text-lg rounded-md m-2 focus:outline-violet-300"
              >
                {item.label}
              </ToggleGroupComponent.Item>
            ))}
          </ToggleGroupComponent.Root>
        </div>

        <div className="flex flex-row-reverse gap-2 py-2">
          <button
            onClick={() => setOpenedModal(null)}
            className="flex justify-center items-center w-[120px] rounded-md border-2 border-slate-3 00 px-4 py-2 text-sm font-semibold leading-6 text-slate-600 shadow-sm hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
          >
            Cancel
          </button>
          <button
            disabled={!active}
            onClick={confirmedProgress}
            className="flex justify-center items-center rounded-md bg-indigo-600 w-[120px] px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-60 disabled:bg-slate-400"
          >
            {showLoader ? <Spinner /> : "Confirm"}
          </button>
        </div>
        {showLoader ? (
          <p className="text-xs font-semibold text-slate-600">
            This may take a bit of your time, please be patient while we
            executing the task.
          </p>
        ) : null}
      </div>
    </Modal>
  );
};

export default SchemaDeploymentModal;

// type Activity = {
//   action: "create" | "update" | "delete" | "rename" | "connect";
//   type: "model" | "field";
//   modelId: string;
//   fieldId: string;
// };
