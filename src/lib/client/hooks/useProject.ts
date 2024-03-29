import { useEffect } from "react";
import { useProjectsStore } from "@/lib/client/store/projects";
import { useGlobalStore } from "../store/global";
import { UserProject } from "@/types";

export function useProjectInit(project: UserProject) {
  const { addProject, setActiveProject } = useProjectsStore();
  const { globalLoader, setGlobalLoader } = useGlobalStore((state) => state);

  useEffect(() => {
    addProject(project);
    setActiveProject(project?.id);

    if (project?.id) {
      // TODO: Load all project's models stored in the database
      // TODO: AND template models
    } else {
    }
    setGlobalLoader(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  return {
    globalLoader,
    setGlobalLoader,
    activeProject: project,
  };
}

export function useProject() {
  const { data, projectIds, activeProjectId } = useProjectsStore(
    (state) => state
  );

  return {
    projects: projectIds.map((id) => data[id]),
    activeProject: activeProjectId ? data[activeProjectId] : null,
  };
}
