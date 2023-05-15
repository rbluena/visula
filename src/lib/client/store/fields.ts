import { ModelField } from "@/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type FieldsState = {
  activeFieldId: string | null;
  data: Record<string, ModelField>;
};

type Actions = {
  addField: (payload: ModelField) => void;
  updateField: (payload: ModelField) => void;
  deleteField: (id: string) => void;
  setActiveField: (id: string) => void;
};

export const useFieldsStore = create(
  immer<FieldsState & Actions>((set) => ({
    data: {},
    activeFieldId: null,

    // Actions
    addField(payload) {
      set((state) => {
        state.data[payload.id] = payload;
      });
    },
    updateField(payload) {
      set((state) => {
        state.data[payload.id] = payload;
      });
    },
    deleteField(id) {
      set((state) => {
        delete state.data[id];
        state.activeFieldId = null;
      });
    },
    setActiveField(id) {
      set((state) => {
        state.activeFieldId = id;
      });
    },
  }))
);
