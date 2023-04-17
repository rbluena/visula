import { ModelRelation } from "@/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type ModelRelationState = {
  activeRelationId: string | null;
  relationIds: string[];
  data: Record<string, ModelRelation>;
};

export type Actions = {
  addRelation: (payload: ModelRelation) => void;
};

export const useModelRelationStore = create(
  immer<ModelRelationState & Actions>((set) => ({
    activeRelationId: null,
    relationIds: [],
    data: {},

    addRelation(payload) {
      set((state) => {
        state.data[payload.sourceModelId] = payload;
      });
    },
  }))
);
