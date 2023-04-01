import { IRange } from "monaco-editor";
import { Monaco } from "@monaco-editor/react";
import getColors from "./getColors";
import {
  generateAutocompleteSuggestions,
  generateSnippetCompletionSuggestions,
} from "./generateSnippetCompletion";

const colors = getColors();
/**
 *
 * @param monaco
 */
export function registerCustomTheme(monaco: Monaco) {
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

/**
 *
 * @param monaco
 */
export function registerMonacoCompletionItem(monaco: Monaco) {
  monaco.languages.registerCompletionItemProvider("visulaLanguage", {
    triggerCharacters: ["@"],
    provideCompletionItems(model, position) {
      let word = model.getWordUntilPosition(position);
      let range: IRange = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      return {
        suggestions: generateAutocompleteSuggestions(range, monaco),
      };
    },
  });
}

/**
 *
 * @param monaco
 */
export function registerMonacoSnippetCompletionItem(monaco: Monaco) {
  monaco.languages.registerCompletionItemProvider("visulaLanguage", {
    provideCompletionItems(model, position) {
      const word = model.getWordUntilPosition(position);
      const range: IRange = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      return {
        suggestions: generateSnippetCompletionSuggestions(range, monaco),
      };
    },
  });
}
