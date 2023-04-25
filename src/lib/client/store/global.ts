import { create } from "zustand";

export type GlobalState = {
  isMigrationModalOpen: boolean;
};

export type Actions = {
  setMigrationModal: (payload: boolean) => void;
};

export const useGlobalStore = create<GlobalState & Actions>((set) => ({
  isMigrationModalOpen: false,
  setMigrationModal(payload) {
    set(() => ({ isMigrationModalOpen: payload }));
  },
}));
