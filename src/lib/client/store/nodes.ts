import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type ModelField = Omit<ModelData, "kind" | "position" | "fields"> & {
  kind: "field";
  validations: Object[];
};

export type ModelData = {
  kind: "model";
  id: string;
  projectId?: string;
  name: string;
  description?: string;
  comment?: string;
  position: { x: number; y: number };
  updateAt?: string;
  fields: ModelField[] | any[];
};

export type NodesState = {
  data: Record<string, ModelData>;
};

export type Actions = {
  addNode: (payload: ModelData) => void;
  addField: (modelId: ModelData["id"], payload: ModelField) => void;
};

export const useNodesStore = create(
  immer<NodesState & Actions>((set) => ({
    data: {},
    addNode: (payload) => {
      set((state) => {
        // payload.id = uuidV4();
        state.data[payload.id] = payload;
      });
    },
    addField: (modelId, payload) => {
      set((state) => {
        state.data[modelId]?.fields.push(payload);
      });
    },
  }))
);
