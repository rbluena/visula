import camelCase from "lodash/camelCase";
import { Edge, Node } from "reactflow";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type ModelField = Omit<ModelData, "kind" | "position" | "fields"> & {
  kind: "field";
  dataType: "Int" | "String" | "Decimal" | "Relation";
  validations: Object[];
};

export type ModelData = Node & {
  kind: "model";
  id: string;
  unique?: string;
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
  activeModelId: string | null;
  connections: Record<string, ConnectionEdge>;
  data: Record<string, ModelData>;
};

export type Actions = {
  addNode: (payload: ModelData) => void;
  deleteModel: (modelId: string) => void;
  addField: (modelId: ModelData["id"], payload: ModelField) => void;
  deleteField?: (fieldId: string) => void;
  createConnection: (payload: ConnectionEdge) => void;
  deleteConnection: (connectionId: string) => void;
  setActiveModel: (modelId: string) => void;
};

export const useNodesStore = create(
  immer<NodesState & Actions>((set) => ({
    activeProjectId: null,
    activeModelId: null,
    connections: {},
    data: {},
    addNode(payload) {
      set((state) => {
        state.data[payload.id] = {
          ...payload,
          unique: camelCase(payload.name),
          selected: true,
        };
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
    deleteModel(modelId) {
      set((state) => {
        const newData = state.data;
        delete newData[modelId];
        state.data = newData;

        console.log(state.data);

        return state;
      });
    },
    setActiveModel(modelId) {
      set((state) => {
        state.activeModelId = modelId;
      });
    },
  }))
);
