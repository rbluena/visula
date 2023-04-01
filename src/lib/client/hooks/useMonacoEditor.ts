import { useEffect, useRef } from "react";
import { Monaco, useMonaco } from "@monaco-editor/react";
import {
  registerCustomTheme,
  registerMonacoCompletionItem,
  registerMonacoSnippetCompletionItem,
} from "@/lib/client/monaco/registerCustomLanguage";

export default function useMonacoEditor() {
  const monacoRef = useRef<Monaco | null>(null);
  const monaco = useMonaco();

  useEffect(() => {
    monacoRef.current = monaco;

    if (monacoRef.current) {
      registerCustomTheme(monacoRef.current);
      registerMonacoCompletionItem(monacoRef.current);
      registerMonacoSnippetCompletionItem(monacoRef.current);
      monacoRef.current.editor.setTheme("visulaTheme");
    }
  }, [monaco]);

  return monaco;
}
