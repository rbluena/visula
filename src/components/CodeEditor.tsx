import useMonacoEditor from "@/lib/client/hooks/useMonacoEditor";
import Editor from "@monaco-editor/react";

const CodeEditor = ({}) => {
  useMonacoEditor();

  return (
    <Editor
      className="h-full"
      defaultLanguage="visulaLanguage"
      // theme="vs-dark"
      options={{
        automaticLayout: true,
        quickSuggestions: true,
        // wordWrap: "on",
      }}
    />
  );
};

export default CodeEditor;
