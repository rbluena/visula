import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";
import { ModelData } from "@/types";
import { useHistoryStore } from "./history";

export type ModelsState = {
  modelIds: string[];
  activeModelId: string | null;
  data: Record<string, ModelData>;
};

export type Actions = {
  addModel: (payload: ModelData) => void;
  updateModel: (payload: ModelData) => void;
  deleteModel: (modelId: string) => void;
  onFieldCreated: (modelId: string, fieldId: string) => void;
  onFieldDeleted: (modelId: string, fieldId: string) => void;
  setActiveModel: (modelId: string) => void;
  setSchemaModelsState: (payload: any) => void;
  localChangesUpdated: () => void;
};

export const useModelStore = create(
  persist(
    immer<ModelsState & Actions>((set) => ({
      modelIds: [],
      data: {},
      activeModelId: null,

      // Actions
      addModel(payload) {
        set((state) => {
          state.data[payload.id] = payload;
          state.modelIds.push(payload.id);

          //
          state.localChangesUpdated();
        });
      },
      setActiveModel(id) {
        set((state) => {
          state.activeModelId = id;
          return state;
        });
      },
      updateModel(payload) {
        set((state) => {
          state.data[payload.id] = payload;

          //
          state.localChangesUpdated();
        });
      },
      deleteModel(id) {
        set((state) => {
          delete state.data[id];
          state.modelIds = state.modelIds.filter((item) => item !== id);
          state.activeModelId = null;

          //
          state.localChangesUpdated();
        });
      },
      onFieldCreated(modelId, fieldId) {
        set((state) => {
          state.data[modelId].fields.push(fieldId);
        });
      },
      onFieldDeleted(modelId, fieldId) {
        set((state) => {
          state.data[modelId].fields = state.data[modelId].fields.filter(
            (item) => item !== fieldId
          );
        });
      },
      setSchemaModelsState(payload) {
        set((state) => ({ ...state, ...payload }));
      },
      localChangesUpdated() {
        useHistoryStore.getState().localChangesUpdated(true);
      },
    })),
    {
      name: "visula-schema-models",
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    }
  )
);
