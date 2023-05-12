import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { UserProject } from "@/types";

export type ProjectsState = {
  activeProjectId: string | null;
  projectIds: string[];
  data: Record<string, UserProject>;
};

export type Actions = {
  addProject: (payload: UserProject) => void;
  updateProjectDetails: (projectId: string, payload: any) => void;
  setActiveProject: (payload: string) => void;
  setLastUpdate: (projectId: string, date: Date) => void;
};

export const useProjectsStore = create(
  immer<ProjectsState & Actions>((set) => ({
    activeProjectId: null,
    projectIds: [],
    data: {},
    addProject(payload) {
      set((state) => {
        state.data[payload.id] = payload;
        state.projectIds.push(payload.id);
      });
    },
    setActiveProject(projectId) {
      set((state) => {
        state.activeProjectId = projectId;
      });
    },
    updateProjectDetails(projectId, payload) {
      set((state) => {
        if (state.data[projectId]) {
          state.data[projectId] = payload;
        }
      });
    },
    setLastUpdate() {
      set((state) => {
        // state.data[projectId].lastUpdate = payload;
        return state;
      });
    },
  }))
);
