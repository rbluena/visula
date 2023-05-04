import useMonacoEditor from "@/lib/client/hooks/useMonacoEditor";
import Editor from "@monaco-editor/react";

type Props = {
  showEditor?: boolean;
};

const CodeEditor = ({ showEditor = false }: Props) => {
  useMonacoEditor();

  return (
    <Editor
      defaultLanguage="visulaLanguage"
      className={`${showEditor ? "" : "hidden"}`}
      options={{
        inlayHints: { enabled: "on" },
        automaticLayout: true,
        quickSuggestions: true,
        insertSpaces: false,
        tabSize: 2,
        showUnused: true,
        autoClosingBrackets: "always",
        autoIndent: "full",
        inlineSuggest: {
          enabled: true,
        },
        tabCompletion: "on",
        formatOnPaste: true,
        formatOnType: true,
        glyphMargin: true,
        fontFamily: '"Fira Code", Consolas, "Courier New", monospace',
        // wordWrap: "on",
      }}
    />
  );
};

export default CodeEditor;
