import useMonacoEditor from "@/lib/client/hooks/useMonacoEditor";
import Editor from "@monaco-editor/react";

const CodeEditor = ({}) => {
  useMonacoEditor();

  return (
    <Editor
      className="h-screen w-full"
      defaultLanguage="visulaLanguage"
      // theme="vs-dark"
      options={{
        automaticLayout: true,
        quickSuggestions: true,
        insertSpaces: false,
        tabSize: 2,
        showUnused: true,
        autoClosingBrackets: "always",
        autoIndent: "full",
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
