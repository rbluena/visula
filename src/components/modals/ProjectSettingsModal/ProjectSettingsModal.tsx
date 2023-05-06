import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as ToggleGroupComponent from "@radix-ui/react-toggle-group";
import Modal from "@/components/common/Modal";
import TextInput from "@/components/form/TextInput/TextInput";
import { useProject } from "@/lib/client/hooks/useProject";
import { useGlobalStore } from "@/lib/client/store/global";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useProjectsStore } from "@/lib/client/store/projects";

const ProjectSettingsModal = () => {
  const { openedModal, setOpenedModal } = useGlobalStore((state) => state);
  const updateProject = useProjectsStore((state) => state.updateProjectDetails);
  const { activeProject } = useProject();
  const { handleSubmit, register, setValue } = useForm({
    defaultValues: {
      name: activeProject?.name,
      description: activeProject?.description,
      accessToken: "",
      spaceId: "",
      environmentId: "",
    },
  });
  const [cms, setCMS] = useState({
    name: activeProject?.settings?.cms?.name || null,
    deploymentConfigured: false,
  });

  function onModalClosed() {
    setOpenedModal(null);
  }

  async function onSubmit(data: any) {
    if (cms?.name.length && data?.accessToken.length && data?.spaceId.length) {
      // TODO: Store details to the server
    }

    const updates = {
      ...activeProject,
      name: data.name,
      description: data.description,
      settings: {
        cms: {
          name: cms.name,
          deploymentConfigured: false,
        },
      },
    };

    updateProject(activeProject?.id || "", updates);
  }

  useEffect(() => {
    setValue("name", activeProject?.name);
    setValue("description", activeProject?.description);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProject]);

  return (
    <Modal
      title=""
      isOpen={openedModal === "project-settings" && activeProject !== null}
      setIsOpen={onModalClosed}
    >
      <div className=" bg-white">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 overscroll-y-scroll"
        >
          <div className="space-y-4">
            <p className="text-xl font-semibold border-b border-slate-100 pt-2">
              Project properties
            </p>
            <TextInput
              placeholder="Enter project name"
              label="Name"
              {...register("name")}
            />
            <TextInput
              placeholder="Enter project description"
              label="Description"
              {...register("description")}
            />
          </div>

          <div>
            <p className="text-xl font-semibold border-b border-slate-100 pt-2">
              CMS options
            </p>
            <ToggleGroupComponent.Root
              type="single"
              onValueChange={(value) =>
                setCMS((state) => ({ ...state, name: value }))
              }
              value={cms.name || ""}
            >
              {[
                { value: "contentful", label: "Contentful", disabled: false },
                { value: "sanity", label: "Sanity", disabled: true },
              ].map((item) => (
                <ToggleGroupComponent.Item
                  disabled={item.disabled}
                  key={item.value}
                  value={item.value}
                  title="Contentful"
                  className="h-[120px] w-[120px] font-semibold border-4 border-slate-200 leading-4 data-[state=on]:bg-indigo-50 data-[state=on]:border-violet-400 disabled:text-slate-400 disabled:hover:border-slate-200 hover:border-violet-400 active:border-violet-400 text-lg rounded-md m-2 focus:outline-violet-300"
                >
                  {item.label}
                </ToggleGroupComponent.Item>
              ))}
            </ToggleGroupComponent.Root>
          </div>

          {cms?.name === "contentful" ? (
            <div>
              <div className="flex gap-2">
                <InformationCircleIcon className="w-8 h-8 block text-lg" />
                <span className="text-[12px] text-slate-500">
                  The information below is not required to create a migration
                  code; however, is needed for deploying schema to the CMS.
                </span>
              </div>

              <TextInput
                placeholder="Enter access token"
                label="Access token"
                {...register("accessToken")}
              />
              <TextInput
                placeholder="Enter space ID"
                label="Space ID"
                {...register("spaceId")}
              />
              <TextInput
                placeholder="Enter environment ID"
                label="Environment ID"
                {...register("environmentId")}
              />
            </div>
          ) : null}

          <div>
            <button
              type="submit"
              className="flex w-full text-md  justify-center rounded-md bg-indigo-600 py-2 md:py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-60 disabled:bg-slate-400"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ProjectSettingsModal;
