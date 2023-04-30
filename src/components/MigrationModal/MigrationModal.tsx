import { useEffect, useState } from "react";
import Modal from "@/components/common/Modal";
import * as ToggleGroupComponent from "@radix-ui/react-toggle-group";
import { useGlobalStore } from "@/lib/client/store/global";
import { useModelRelationStore } from "@/lib/client/store/relations";
import { useNodesStore } from "@/lib/client/store/nodes";
import Spinner from "../common/Spinner/Spinner";

const MigrationModal = () => {
  const {
    isMigrationModalOpen,
    setMigrationModal,
    setGeneratedCode,
    openGeneratedCode,
  } = useGlobalStore((state) => state);
  const relations = useModelRelationStore((state) => state.data);
  const models = useNodesStore((state) => state.data);
  const [showSpinner, setShowSpinner] = useState(false);
  const [active, setActive] = useState<string | "contentful" | "sanity" | null>(
    null
  );

  async function generateContentfulMigrationCode() {
    try {
      setShowSpinner(true);
      setGeneratedCode("");

      const response = await fetch(`/api/migrations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ models, relations }),
      });

      const result = await response.json();
      setGeneratedCode(result?.data || "");
      openGeneratedCode(true);
      setShowSpinner(false);
      setActive(null);
      setMigrationModal(false);
    } catch (error) {
      setGeneratedCode("");
      setShowSpinner(false);
      setActive(null);

      // console.log(error);
    }
  }

  useEffect(() => {
    if (active === "contentful") {
      generateContentfulMigrationCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <Modal isOpen={isMigrationModalOpen} setIsOpen={setMigrationModal}>
      <div className="divide-y divide-violet-200">
        <div className="w-full">
          <h1 className="text-lg leading-5 pb-2 font-semibold">
            Create migration code
          </h1>
        </div>
        <div className="pt-3">
          {showSpinner ? <Spinner className="w-8 h-8" /> : null}
          <ToggleGroupComponent.Root
            type="single"
            defaultValue="contenful"
            onValueChange={setActive}
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
                className="h-[120px] w-[120px] border border-slate-200 leading-4 data-[state=on]:bg-white data-[state=on]:border-violet-400 disabled:hover:border-slate-200 hover:border-violet-400 active:border-violet-400 text-lg rounded-md m-2 focus:outline-violet-300"
              >
                {item.label}
              </ToggleGroupComponent.Item>
            ))}
          </ToggleGroupComponent.Root>
        </div>
        {/* <div className="">
          <button className=" text-sm p-2 bg-violet-700">Create</button>
        </div> */}
      </div>
    </Modal>
  );
};

export default MigrationModal;
