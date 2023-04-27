import { create } from "zustand";

export type GlobalState = {
  isMigrationModalOpen: boolean;
  generatedCode: string;
  isGeneratedCodeOpen: boolean;
};

export type Actions = {
  setMigrationModal: (payload: boolean) => void;
  setGeneratedCode: (payload: string) => void;
  openGeneratedCode: (payload: boolean) => void;
};

export const useGlobalStore = create<GlobalState & Actions>((set) => ({
  isMigrationModalOpen: false,
  isGeneratedCodeOpen: false,
  generatedCode: "",
  openGeneratedCode(payload) {
    set(() => ({ isGeneratedCodeOpen: payload }));
  },
  setGeneratedCode(payload) {
    set(() => ({ generatedCode: payload }));
  },
  setMigrationModal(payload) {
    set(() => ({ isMigrationModalOpen: payload }));
  },
}));
