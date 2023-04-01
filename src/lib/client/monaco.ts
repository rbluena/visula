import { Monaco } from "@monaco-editor/react";
import { IRange, languages } from "monaco-editor";

import generateAutocompleteSuggestions from "./generateAutocompleteSuggestions";

export function registerMonacoLanguageCustomTheme(monaco: Monaco) {
  monaco.languages.register({ id: "visulaLanguage" });
  monaco.languages.setMonarchTokensProvider("visulaLanguage", {
    tokenizer: {
      root: [
        [/#.*$/, "comment"],
        [/[{}\(\)\[\]]/, "brackets"],
        [/"(?:[^"\\]|\\.)*"/, "string"],
        [/\@[a-zA-z]*/, "keyword.model"],
        [/model/, "keyword.model"],
        [/[a-zA-Z_]?[\w$]+/, "variable"],
        // [/"([^"\\]|\\.)*$/, "string.invalid"],
      ],
    },
  });

  monaco.editor.defineTheme("visulaTheme", {
    base: "vs",
    inherit: false,
    rules: [
      {
        token: "variable",
        foreground: colors.variable.foreground,
        fontStyle: "bold",
      },
      {
        token: "keyword.types",
        foreground: colors.variable.foreground,
        fontStyle: "italic",
      },
      {
        token: "comment",
        foreground: colors.comment.foreground,
        fontStyle: "italic",
      },
      {
        token: "string",
        foreground: colors.string.foreground,
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
    triggerCharacters: ["@"],
    provideCompletionItems(model, position, context, token) {
      let word = model.getWordUntilPosition(position);
      let range: IRange = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      return {
        suggestions: generateFunctionsAutocompleteSuggestions(range, monaco),
      };
    },
  });

  monaco.languages.registerCompletionItemProvider("visulaLanguage", {
    // triggerCharacters: ["$"],
    provideCompletionItems(model, position, _) {
      let word = model.getWordUntilPosition(position);
      let range: IRange = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      let suggestions: languages.CompletionItem[] = [
        {
          label: "model",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: ["model ${1:ModelName} {", "\t$0", "}"].join("\n"),
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Model",
          preselect: true,
          range,
        },
        {
          label: "field",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: [
            "# ${4:Description of the field}\n",
            "${1:fieldID}!\t",
            "@${2:String}",
            '("${3:Field Name}")',
            ";$0",
          ].join(""),
          preselect: true,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "Consider this as description of the model",
          range,
        },
        // {
        //   label: "fldv",
        //   kind: monaco.languages.CompletionItemKind.Snippet,
        //   insertText: [
        //     "# ${2:Description of the field}\n",
        //     "${1:fieldName}\t",
        //     "@${3:String}",
        //     '("${4:Field title}", [\n\t{}\n])',
        //     ";$0",
        //   ].join(""),
        //   insertTextRules:
        //     monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        //   range,
        // },
      ];

      return {
        suggestions,
      };
    },
  });
}
