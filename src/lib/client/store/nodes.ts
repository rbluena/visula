import { Edge } from "reactflow";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type ConnectionEdge = Edge & {
  sourceModelId: string;
  sourceFieldId: string;
  targetModelId: string;
};

export type NodesState = {
  activeProjectId: string | null;
  connections: Record<string, ConnectionEdge>;
};

export type Actions = {
  createConnection: (payload: ConnectionEdge) => void;
  deleteConnection: (connectionId: string) => void;
  updateFieldValidations?: (modelId: string, fieldId: string) => void;
};

export const useNodesStore = create(
  immer<NodesState & Actions>((set) => ({
    activeProjectId: null,
    connections: {},
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
