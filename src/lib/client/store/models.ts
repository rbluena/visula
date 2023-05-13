import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { ModelData, ModelField } from "@/types";

export type ModelsState = {
  modelIds: string[];
  activeModelId: string | null;
  data: Record<string, ModelData>;
};

export type Actions = {
  addModel: (payload: ModelData) => void;
  updateModel?: (payload: ModelData) => void;
  deleteModel: (modelId: string) => void;
  addField?: (modelId: string, payload: ModelField) => void;
  updateField?: (modelId: string, payload: ModelField) => void;
  deleteField?: (modelId: string, fieldId: string) => void;
  setActiveModel: (modelId: string) => void;
};

export const useModelStore = create(
  immer<ModelsState & Actions>((set) => ({
    modelIds: [],
    data: {},
    activeModelId: null,

    // Actions
    addModel(payload) {
      set((state) => {
        state.data[payload.id] = payload;
        state.modelIds.push(payload.id);
      });
    },
    setActiveModel(id) {
      set((state) => {
        state.activeModelId = id;
        return state;
      });
    },

    deleteModel(id) {
      set((state) => {
        delete state.data[id];
        state.modelIds = state.modelIds.filter((item) => item !== id);
        state.activeModelId = null;
      });
    },
  }))
);
