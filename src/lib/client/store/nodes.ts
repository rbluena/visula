import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { v4 as uuidV4 } from "uuid";

export type ModelField = Omit<ModelData, "type"> & {
  validation?: Object[];
};

export type ModelData = {
  id: string;
  name?: string;
  description?: string;
  comment?: string;
  type?: "model";
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
    addNode: (payload: ModelData) =>
      set((state) => {
        payload.id = uuidV4();
        state.data[payload.id] = payload;
      }),
  }))
);
