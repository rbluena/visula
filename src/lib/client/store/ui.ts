import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";
// import { immer } from "zustand/middleware/immer";

type State = {
  editor: "nodes-editor" | "code-editor";
};

type Actions = {
  switchEditor: (value: "nodes-editor" | "code-editor") => void;
};

// export const useUIStore = createStore<UIState>()(
//   persist(
//     immer((set) => ({
//       editor: "nodes-editor",
//       switchEditor(value: string) {
//         set((state) => (state.editor = value));
//       },
//     })),
//     {
//       name: "visulaUIStore",
//       storage: createJSONStorage(() => sessionStorage),
//     }
//   )
// );

export const useUIStore = create<State & Actions>((set) => ({
  editor: "nodes-editor",
  switchEditor: (value) => set({ editor: value }),
}));
