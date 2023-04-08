import { create } from "zustand";

type State = {
  editor: "nodes-editor" | "code-editor";
};

type Actions = {
  switchEditor: (value: "nodes-editor" | "code-editor") => void;
};

export const useUIStore = create<State & Actions>((set) => ({
  editor: "nodes-editor",
  switchEditor: (value) => set({ editor: value }),
}));
