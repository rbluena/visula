import { Edge } from "reactflow";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { ModelField, ModelData } from "@/types";

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
  modelIds: string[];
};

export type Actions = {
  addNode: (payload: ModelData) => void;
  updateModel: (payload: ModelData) => void;
  deleteModel: (modelId: string) => void;
  addField: (modelId: string, payload: ModelField) => void;
  updateField: (modelId: string, payload: ModelField) => void;
  deleteField: (modelId: string, fieldId: string) => void;
  createConnection: (payload: ConnectionEdge) => void;
  deleteConnection: (connectionId: string) => void;
  updateFieldValidations?: (modelId: string, fieldId: string) => void;
  setActiveModel: (modelId: string) => void;
};

export const useNodesStore = create(
  immer<NodesState & Actions>((set) => ({
    activeProjectId: null,
    activeModelId: null,
    connections: {},
    data: {},
    modelIds: [],
    addNode(payload) {
      set((state) => {
        state.data[payload.id] = payload;
        state.modelIds.push(payload.id);
      });
    },
    updateModel(payload) {
      set((state) => {
        state.data[payload.id] = payload;
      });
    },
    deleteModel(modelId) {
      set((state) => {
        const newData = state.data;
        delete newData[modelId];
        state.data = newData;
        state.modelIds = state.modelIds.filter((id) => id !== modelId);
        return state;
      });
    },
    addField(modelId, payload) {
      set((state) => {
        state.data[modelId].fields.push(payload);
      });
    },
    updateField(modelId, payload) {
      // If model exists and field exists, we update the field
      set((state) => {
        const newFields = state.data?.[modelId]?.fields?.map((item) => {
          if (item.id === payload.id) {
            return {
              ...item,
              ...payload,
            };
          }

          return item;
        });

        if (state.data?.[modelId]) {
          state.data[modelId].fields = newFields;
        }
      });
      // If model exists and field not, we add field
    },
    deleteField(modelId, fieldId) {
      set((state) => {
        if (!state.data?.[modelId]) {
          // Throw an error
          return state;
        }

        const newFields = state.data?.[modelId]?.fields?.filter(
          (item) => item.id !== fieldId
        );

        state.data[modelId].fields = newFields;
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
    setActiveModel(modelId) {
      set((state) => {
        state.activeModelId = modelId;
      });
    },
    // updateFieldValidations(modelId, fieldId) {
    //   set((state) => {
    //     const model = state.data[modelId].
    //   })
    // }
  }))
);
