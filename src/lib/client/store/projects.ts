import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type UserProject = {
  id: string;
  title?: string;
  description?: string;
  lastUpdate?: Date;
};

export type ProjectsState = {
  activeProjectId: string | null;
  projectIds: string[];
  data: Record<string, UserProject>;
  settings: Record<string, any>;
};

export type Actions = {
  addProject: (payload: UserProject) => void;
  setActiveProject: (payload: string) => void;
  setLastUpdate: (projectId: string, date: Date) => void;
};

export const useProjectsStore = create(
  immer<ProjectsState & Actions>((set) => ({
    activeProjectId: null,
    projectIds: [],
    data: {},
    settings: {
      edgeType: "smoothstep",
    },
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
    setLastUpdate(projectId, payload) {
      set((state) => {
        state.data[projectId].lastUpdate = payload;
      });
    },
  }))
);
