import useMonacoEditor from "@/lib/client/hooks/useMonacoEditor";
import Editor from "@monaco-editor/react";

const defaultValue = `
// This is oneline comment

  model Products {
    # This is a comment for this field
    fullName String("Full Name"); # This is description of the field but written as comment
    age Int("Age");
  }
`;

const CodeEditor = ({}) => {
  useMonacoEditor();

  return (
    <Editor
      className="h-full"
      defaultLanguage="visulaLanguage"
      defaultValue={defaultValue}
      options={{
        automaticLayout: true,
      }}
    />
  );
};

export default CodeEditor;
