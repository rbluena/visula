import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as ToggleGroupComponent from "@radix-ui/react-toggle-group";
import Modal from "@/components/common/Modal";
import TextInput from "@/components/form/TextInput/TextInput";
import { useProject } from "@/lib/client/hooks/useProject";
import { useGlobalStore } from "@/lib/client/store/global";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useProjectsStore } from "@/lib/client/store/projects";
import { updateProjectService } from "@/services/project";
import Spinner from "@/components/common/Spinner/Spinner";

const ProjectSettingsModal = () => {
  const [isLoading, setIsLoading] = useState(false);
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
  // const [isModalOpened, setIsModalOpened] = useState(false)
  const [cms, setCMS] = useState({
    type:
      JSON.parse(activeProject?.projectSetting?.contentManagementSystem || "{}")
        ?.type || null,
    deploymentConfigured: false,
  });

  const isModalOpened =
    openedModal === "project-settings" && activeProject !== null;

  function onModalClosed() {
    setOpenedModal(null);
  }

  async function onSubmit(data: any) {
    setIsLoading(true);

    try {
      const project = await updateProjectService(
        activeProject!.id,
        {
          name: data.name,
          description: data.description,
        },
        {
          ...(cms?.type?.length &&
          data?.accessToken?.length &&
          data?.spaceId?.length
            ? {
                type: cms.type,
                accessToken: data.accessToken,
                spaceId: data.spaceId,
                environmentId: data.environmentId,
              }
            : {}),
        }
      );

      updateProject(project.id, project);
      setIsLoading(false);
      setOpenedModal(null);
    } catch (error) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setValue("name", activeProject?.name);
    setValue("description", activeProject?.description);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProject]);

  return (
    <Modal title="" isOpen={isModalOpened} setIsOpen={onModalClosed}>
      <div className={`bg-white ${!isModalOpened && "hidden"}`}>
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
                setCMS((state) => ({ ...state, type: value }))
              }
              value={cms.type || ""}
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

          {cms?.type === "contentful" ? (
            <div>
              <div className="flex gap-2">
                <InformationCircleIcon className="w-8 h-8 block text-lg" />
                <span className="text-[12px] text-slate-500">
                  The information below is not required to create a migration
                  code; however, is needed for deploying schema to the CMS.{" "}
                </span>
              </div>

              {activeProject?.projectSetting?.contentManagementSystem
                ?.length ? (
                <button
                  type="button"
                  className="text-indigo-700 text-sm hover:underline"
                >
                  Update CMS details
                </button>
              ) : (
                <>
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
                </>
              )}
            </div>
          ) : null}

          <div>
            <button
              type="submit"
              className="flex w-full text-md  justify-center rounded-md bg-indigo-600 py-2 md:py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-60 disabled:bg-slate-400"
            >
              {isLoading ? <Spinner /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ProjectSettingsModal;
