import { ModelField } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { useHistoryStore } from "./history";

type FieldsState = {
  activeFieldId: string | null;
  data: Record<string, ModelField>;
};

type Actions = {
  addField: (payload: ModelField) => void;
  updateField: (payload: ModelField) => void;
  deleteField: (id: string) => void;
  setActiveField: (id: string) => void;
  setSchemaFieldsState: (payload: any) => void;
  localChangesUpdated: () => void;
};

export const useFieldsStore = create(
  persist(
    immer<FieldsState & Actions>((set) => ({
      data: {},
      activeFieldId: null,

      // Actions
      addField(payload) {
        set((state) => {
          state.data[payload.id] = payload;

          //
          state.localChangesUpdated();
        });
      },
      updateField(payload) {
        set((state) => {
          state.data[payload.id] = payload;

          //
          state.localChangesUpdated();
        });
      },
      deleteField(id) {
        set((state) => {
          delete state.data[id];
          state.activeFieldId = null;

          state.localChangesUpdated();
        });
      },
      setActiveField(id) {
        set((state) => {
          state.activeFieldId = id;
        });
      },
      setSchemaFieldsState(payload) {
        set((state) => {
          state.data = payload.data;
        });
      },
      localChangesUpdated() {
        useHistoryStore.getState().localChangesUpdated(true);
      },
    })),
    {
      name: "visula-schema-fields",
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    }
  )
);
