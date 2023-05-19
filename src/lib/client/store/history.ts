import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { SchemaData } from "@/types";

type PartialSchema = Partial<SchemaData>;

type HistoryState = {
  activeSchemaId: string | null;
  schemaIds: string[];
  data: Record<string, PartialSchema>;
  meta: { pagination?: { page: number; limit: number } };
};

type Actions = {
  addSchema: (payload: PartialSchema) => void;
  removeSchema: (id: string) => void;
  appendLoadedSchemas: (paylod: any) => void;
  updateSchemaMetadata: (id: string, payload: PartialSchema) => void;
  resetState: (payload?: Partial<HistoryState>) => void;
  // loadSchemaDesign: (id: string) => void;
};

export const useHistoryStore = create(
  immer<HistoryState & Actions>((set) => ({
    activeSchemaId: null,
    schemaIds: [],
    data: {},
    meta: {},

    // Actions
    addSchema(payload) {
      set((state) => {
        state.schemaIds.unshift(payload.id as string);
        state.data[payload.id as string] = payload;
      });
    },
    updateSchemaMetadata(id, payload) {
      set((state) => {
        state.data[id] = payload;
      });
    },
    appendLoadedSchemas(payload: any) {
      set((state) => {
        state.data = {
          ...state.data,
          ...payload.data,
        };
        console.log(payload);

        state.schemaIds.concat(payload.schemaIds);
      });
    },
    removeSchema(id) {
      set((state) => {
        delete state.data[id];
      });
    },
    resetState(payload) {
      set((state) => {
        if (payload) {
          state.data = payload.data as HistoryState["data"];
          state.schemaIds = payload.schemaIds as string[];
          // state.meta = payload.meta
        }

        state.data;
      });
    },
  }))
);
