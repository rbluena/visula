import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type UserProject = {
  id: string;
  title?: string;
  description?: string;
  lastUpdate?: Date;
};

export type ProjectsState = {
  data: Record<string, UserProject>;
};

export type Actions = {
  addProject: (payload: UserProject) => void;
  setLastUpdate: (projectId: string, date: Date) => void;
};

export const useProjectsStore = create(
  immer<ProjectsState & Actions>((set) => ({
    data: {},
    addProject(payload) {
      set((state) => {
        state.data[payload.id] = payload;
      });
    },
    setLastUpdate(projectId, payload) {
      set((state) => {
        state.data[projectId].lastUpdate = payload;
      });
    },
  }))
);
