import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type GeneratorState = {
  generatedModelsIds: string[];
  data: Record<string, any>;
};

type Actions = {
  addGeneratedData: (modelId: string, schemaId: string, data: any) => void;
};

export const useGeneratorStore = create(
  immer<GeneratorState & Actions>((set) => ({
    generatedModelsIds: [],
    data: {},

    // Actions
    addGeneratedData(modelId, schemaId, payload = []) {
      set((state) => {
        state.generatedModelsIds.push(modelId);
        state.data[modelId] = {
          modelId,
          schemaId,
          data: JSON.stringify(payload),
        };
      });
    },
  }))
);
