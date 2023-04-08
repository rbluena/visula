import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type ModelField = Omit<ModelData, "kind"> & {
  kind: "field";
  type: "field";
  validation?: Object[];
};

export type ModelData = {
  kind: "model";
  id: string;
  name: string;
  description?: string;
  comment?: string;
  position: { x: number; y: number };
  updateAt?: string;
  fields: ModelField[] | [];
};

export type NodesState = {
  data: Record<string, ModelData>;
};

export type Actions = {
  addNode: (payload: ModelData) => void;
};

export const useNodesStore = create(
  immer<NodesState & Actions>((set) => ({
    data: {},
    addNode: (payload: ModelData) => {
      set((state) => {
        // payload.id = uuidV4();
        state.data[payload.id] = payload;
      });
    },
  }))
);
