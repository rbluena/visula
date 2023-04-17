import { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { useProjectsStore } from "@/lib/client/store/projects";

export function useProjectInit(isTry: boolean) {
  const { addProject, setActiveProject } = useProjectsStore();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (isTry) {
      const newProject = {
        id: uuidV4(),
        title: "Try project",
        description: "This is dummy project for experiment and review.",
        lastUpdate: new Date(),
      };

      addProject(newProject);
      setActiveProject(newProject.id);
      setShowLoader(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTry]);

  return {
    showLoader,
  };
}

export function useProject() {
  const { data, projectIds, activeProjectId } = useProjectsStore();

  return {
    projects: projectIds.map((id) => data[id]),
    activeProject: activeProjectId ? data[activeProjectId] : null,
  };
}
