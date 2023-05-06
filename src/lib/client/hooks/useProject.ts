import { useEffect } from "react";
import { v4 as uuidV4 } from "uuid";
import { useProjectsStore } from "@/lib/client/store/projects";
import { useGlobalStore } from "../store/global";
import { UserProject } from "@/types";

export function useProjectInit(isTry: boolean) {
  const { addProject, setActiveProject } = useProjectsStore();
  const { globalLoader, setGlobalLoader } = useGlobalStore((state) => state);

  useEffect(() => {
    if (isTry) {
      const newProject: UserProject = {
        id: uuidV4(),
        name: "Dummy project",
        description: "This is dummy project for experiment and review.",
        lastUpdate: new Date(),
        settings: {
          cms: {
            name: null,
            deploymentConfigured: false,
          },
        },
      };

      addProject(newProject);
      setActiveProject(newProject.id);
    }

    setGlobalLoader(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTry]);

  return {
    showLoader: globalLoader,
  };
}

export function useProject() {
  const { data, projectIds, activeProjectId } = useProjectsStore();

  return {
    projects: projectIds.map((id) => data[id]),
    activeProject: activeProjectId ? data[activeProjectId] : null,
  };
}
