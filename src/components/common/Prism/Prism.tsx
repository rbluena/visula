import { useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";

const Prism = ({ code }: { code: string }) => {
  const codeEditor = useRef<editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    codeEditor.current?.getAction("editor.action.format")?.run();
  }, [code]);

  return (
    <Editor
      defaultLanguage="javascript"
      theme="vs-dark"
      className="max-h-screen"
      value={code}
      onMount={(editor) => {
        codeEditor.current = editor;
      }}
      options={{
        formatOnPaste: true,
        formatOnType: true,
        autoIndent: "advanced",
        fontSize: 14,
        contextmenu: false,
        // readOnly: true,
      }}
    />
  );
};

export default Prism;
