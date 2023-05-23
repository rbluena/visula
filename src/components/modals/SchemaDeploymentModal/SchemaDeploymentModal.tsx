import { useState } from "react";
import * as ToggleGroupComponent from "@radix-ui/react-toggle-group";
import Modal from "@/components/common/Modal/Modal";
import Spinner from "@/components/common/Spinner/Spinner";
import { useGlobalStore } from "@/lib/client/store/global";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import {
  deploySchemaService,
  generateMigrationCodeService,
} from "@/services/schemas";
import { useRouter } from "next/router";
import { useHistoryStore } from "@/lib/client/store/history";

const SchemaDeploymentModal = () => {
  const { openedModal, setOpenedModal } = useGlobalStore((state) => state);
  const activeSchemaId = useHistoryStore((state) => state.activeSchemaId);
  const [showLoader, setShowLoader] = useState(false);
  const [active, setActive] = useState<"contentful" | "sanity">("contentful");
  const { query } = useRouter();

  const isModalOpen = openedModal === "deploy" || openedModal === "migration";

  async function confirmedProgress() {
    setShowLoader(true);

    try {
      if (openedModal === "deploy") {
        const deployResponse = await deploySchemaService(query.id as string, {
          schemaId: activeSchemaId as string,
          cmsType: active,
        });
      }

      if (openedModal === "migration") {
        // Do the migration
        const migrationResponse = await generateMigrationCodeService(
          query.id as string,
          {
            schemaId: activeSchemaId as string,
            cmsType: active,
          }
        );
      }
      setShowLoader(false);
    } catch (error) {
      // Error
      setShowLoader(false);
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
          <p className="text-sm text-slate-500 flex items-start gap-1s">
            <InformationCircleIcon className="w-5 h-5" />
            {openedModal === "deploy" && active === "contentful"
              ? "You are about to deploy an active schema to a contentful environment. The deployment will lead to content types being modified and contents being deleted."
              : null}

            {openedModal === "migration" && active === "contentful"
              ? "You are about to create migration code for contentful CMS, this action will not affect your contentful environment."
              : null}
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

        <div className="flex gap-2 py-2">
          <button
            disabled={!active}
            onClick={confirmedProgress}
            className="flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-60 disabled:bg-slate-400"
          >
            {showLoader ? <Spinner /> : null}
            Confirm
          </button>
          <button
            onClick={() => setOpenedModal(null)}
            className="flex justify-center rounded-md border-2 border-slate-3 00 px-4 py-2 text-sm font-semibold leading-6 text-slate-600 shadow-sm hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SchemaDeploymentModal;
