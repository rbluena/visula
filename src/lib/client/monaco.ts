import { Monaco } from "@monaco-editor/react";

const typeKeywords = [/String(\".\")/, /Int(\".\")/];

export const colors = {
  comment: {
    foreground: "3795BD",
  },
  keywordModel: {
    foreground: "B3005E",
  },
  typeKeywords: {
    foreground: "2F58CD",
  },
  blocks: {
    foreground: "",
  },
  errors: {
    foreground: "ff0000",
  },
  brackets: {
    foreground: "2F58CD",
  },
};

export function createMonacoLanguageCustomTheme(monaco: Monaco) {
  monaco.languages.register({ id: "visulaLanguage" });
  monaco.languages.setMonarchTokensProvider("visulaLanguage", {
    typeKeywords,
    tokenizer: {
      root: [
        [/#.*$/, "comment"],
        [/[{}\(\)\[\]]/, "brackets"],
        [/model/, "keyword.model"],
        [/"([^"\\]|\\.)*$/, "string.invalid"],
      ],
    },
  });

  monaco.editor.defineTheme("visulaTheme", {
    base: "vs",
    inherit: false,
    rules: [
      {
        token: "comment",
        foreground: colors.comment.foreground,
        fontStyle: "italic",
      },
      {
        token: "brackets",
        foreground: colors.brackets.foreground,
      },
      {
        token: "keyword.model",
        foreground: colors.keywordModel.foreground,
        fontStyle: "italic",
      },
      // {
      //   token: "string.invalid",
      //   foreground: colors.errors.foreground,
      // },
    ],
    colors: {},
  });
}

export function registerMonacoCompletionItem(monaco: Monaco) {
  monaco.languages.registerCompletionItemProvider("visulaLanguage", {
    provideCompletionItems: (model, position) => {
      let word = model.getWordUntilPosition(position);
      let range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      let suggestions = [
        {
          label: "testing",
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: "testing(${1:condition})",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: range,
        },
        {
          label: "ifelse",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: [
            "if (${1:condition}) {",
            "\t$0",
            "} else {",
            "\t",
            "}",
          ].join("\n"),
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "If-Else Statement",
          range: range,
        },
      ];

      return {
        suggestions,
      };
    },
  });
}
