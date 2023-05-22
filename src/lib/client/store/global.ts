import { create } from "zustand";

type OpenedModal =
  | "migration"
  | "deploy"
  | "model-update"
  | "project-settings"
  | "schema-tagging"
  | null;

export type NotificationMessage = {
  type: "success" | "error" | "warning";
  location: "model-canvas" | "somewhereelse";
  message: string;
};

export type GlobalState = {
  openedModal: OpenedModal;
  isMigrationModalOpen: boolean;
  generatedCode: string;
  isGeneratedCodeOpen: boolean;
  globalLoader: boolean;
  notification: null | NotificationMessage;
};

export type Actions = {
  setMigrationModal: (payload: boolean) => void;
  setGeneratedCode: (payload: string) => void;
  openGeneratedCode: (payload: boolean) => void;
  setGlobalLoader: (payload: boolean) => void;
  setNotification: (payload: NotificationMessage | null) => void;
  setOpenedModal: (payload: OpenedModal) => void;
};

export const useGlobalStore = create<GlobalState & Actions>((set) => ({
  isMigrationModalOpen: false,
  openedModal: null,
  isGeneratedCodeOpen: false,
  generatedCode: "",
  notification: null,
  globalLoader: true,
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
  setGlobalLoader(payload) {
    set(() => ({ globalLoader: payload }));
  },
  setOpenedModal: (payload) => set(() => ({ openedModal: payload })),
}));
