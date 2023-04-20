import { ModelRelation } from "@/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// TODO: On the right pane, user should be able to toggle whether to show one model at a time or to show
// todo: all list of models

export type ModelRelationState = {
  activeRelationId: string | null;
  relationIds: string[];
  data: Record<string, ModelRelation>;
};

export type Actions = {
  addRelation: (payload: ModelRelation) => void;
  updateRelation: (fieldId: string, payload: ModelRelation) => void;
  removeRelationFromStore: (fieldId: string) => void;
};

export const useModelRelationStore = create(
  immer<ModelRelationState & Actions>((set) => ({
    activeRelationId: null,
    relationIds: [],
    data: {},

    addRelation(payload) {
      set((state) => {
        state.data[payload.sourceFieldId] = payload;
        state.relationIds.push(payload.sourceFieldId);
        return state;
      });
    },
    updateRelation(fieldId, payload) {
      set((state) => {
        if (!state.data[fieldId]) return;
        state.data[fieldId] = payload;
      });
    },
    removeRelationFromStore(fieldId) {
      set((state) => {
        delete state.data[fieldId];
        state.relationIds = state.relationIds.filter((id) => id !== fieldId);
      });
    },
  }))
);
