import { useEffect } from "react";
import { useMonaco } from "@monaco-editor/react";
import {
  registerMonacoLanguageCustomTheme,
  registerMonacoCompletionItem,
} from "../monaco";

export default function useMonacoEditor() {
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      registerMonacoLanguageCustomTheme(monaco);
      registerMonacoCompletionItem(monaco);

      monaco.editor.setTheme("visulaTheme");
    }
  }, [monaco]);

  return monaco;
}
