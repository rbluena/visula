import { create } from "zustand";

export type NotificationMessage = {
  type: "success" | "error" | "warning";
  location: "model-canvas" | "somewhereelse";
  message: string;
};

export type GlobalState = {
  isMigrationModalOpen: boolean;
  generatedCode: string;
  isGeneratedCodeOpen: boolean;
  notification: null | NotificationMessage;
};

export type Actions = {
  setMigrationModal: (payload: boolean) => void;
  setGeneratedCode: (payload: string) => void;
  openGeneratedCode: (payload: boolean) => void;
  setNotification: (payload: NotificationMessage | null) => void;
};

export const useGlobalStore = create<GlobalState & Actions>((set) => ({
  isMigrationModalOpen: false,
  isGeneratedCodeOpen: false,
  generatedCode: "",
  notification: null,
  openGeneratedCode(payload) {
    set(() => ({ isGeneratedCodeOpen: payload }));
  },
  setGeneratedCode(payload) {
    set(() => ({ generatedCode: payload }));
  },
  setMigrationModal(payload) {
    set(() => ({ isMigrationModalOpen: payload }));
  },
  setNotification(payload) {
    set(() => ({ notification: payload }));
  },
}));
