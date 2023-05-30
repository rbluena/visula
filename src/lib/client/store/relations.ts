import { ModelRelation } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { useHistoryStore } from "./history";

export type ModelRelationState = {
  activeRelationId: string | null;
  relationIds: string[];
  data: Record<string, ModelRelation>;
};

export type Actions = {
  addRelation: (payload: ModelRelation) => void;
  updateRelation: (fieldId: string, payload: Partial<ModelRelation>) => void;
  removeRelationFromStore: (fieldId: string) => void;
  disconnectRelationTargetModel: (
    sourceFieldId: string,
    targetModelId: string
  ) => void;
  setSchemaRelationsState: (payload: any) => void;
  localChangesUpdated: () => void;
};

export const useModelRelationStore = create(
  persist(
    immer<ModelRelationState & Actions>((set) => ({
      activeRelationId: null,
      relationIds: [],
      data: {},

      addRelation(payload) {
        set((state) => {
          if (!state.data[payload.sourceFieldId]) {
            state.relationIds.push(payload.sourceFieldId);
          }

          state.data[payload.sourceFieldId] = payload;

          //
          state.localChangesUpdated();
        });
      },
      updateRelation(sourceFieldId, payload) {
        set((state) => {
          if (!state.data[sourceFieldId]) return;
          state.data[sourceFieldId] = {
            ...state.data[sourceFieldId],
            ...payload,
          };

          //
          state.localChangesUpdated();
        });
      },
      removeRelationFromStore(fieldId) {
        set((state) => {
          delete state.data[fieldId];
          state.relationIds = state.relationIds.filter((id) => id !== fieldId);

          //
          state.localChangesUpdated();
        });
      },
      disconnectRelationTargetModel(sourceFieldId, targetModelId) {
        set((state) => {
          if (state.data[sourceFieldId]) {
            state.data[sourceFieldId].connectedTargetModels = state.data[
              sourceFieldId
            ].connectedTargetModels.filter((id) => id !== targetModelId);
          }

          //
          state.localChangesUpdated();
        });
      },
      setSchemaRelationsState(payload) {
        set((state) => ({ ...state, ...payload }));
      },
      localChangesUpdated() {
        useHistoryStore.getState().localChangesUpdated(true);
      },
    })),

    {
      name: "visula-schema-relations",
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    }
  )
);
