import { Edge } from "reactflow";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type ModelField = Omit<ModelData, "kind" | "position" | "fields"> & {
  kind: "field";
  dataType: "Int" | "String" | "Decimal" | "Relation";
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

export type ConnectionEdge = Edge & {
  sourceModelId: string;
  sourceFieldId: string;
  targetModelId: string;
};

export type NodesState = {
  activeProjectId: string | null;
  connections: Record<string, ConnectionEdge>;
  data: Record<string, ModelData>;
};

export type Actions = {
  addNode: (payload: ModelData) => void;
  deleteModel?: (modelId: string) => void;
  addField: (modelId: ModelData["id"], payload: ModelField) => void;
  deleteField?: (fieldId: string) => void;
  createConnection: (payload: ConnectionEdge) => void;
  deleteConnection: (connectionId: string) => void;
};

export const useNodesStore = create(
  immer<NodesState & Actions>((set) => ({
    activeProjectId: null,
    connections: {},
    data: {},
    addNode(payload) {
      set((state) => {
        // payload.id = uuidV4();
        state.data[payload.id] = payload;
      });
    },
    addField(modelId, payload) {
      set((state) => {
        state.data[modelId]?.fields.push(payload);
      });
    },
    createConnection(payload) {
      set((state) => {
        state.connections[payload.source] = {
          ...payload,
          sourceModelId: payload.source,
          sourceFieldId: payload.sourceHandle as string,
          targetModelId: payload.target,
        };
      });
    },
    deleteConnection(connectionId) {
      set((state) => {
        delete state.connections[connectionId];
      });
    },
  }))
);
