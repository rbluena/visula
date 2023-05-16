import { ModelField } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
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
  persist(
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
          return state;
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
    })),
    {
      name: "visula-schema-fields",
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    }
  )
);
