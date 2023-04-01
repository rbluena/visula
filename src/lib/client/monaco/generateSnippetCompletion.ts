import { Monaco } from "@monaco-editor/react";
import { IRange, languages } from "monaco-editor";

/**
 *
 * @param range
 * @param monaco
 * @returns
 */
export function generateSnippetCompletionSuggestions(
  range: IRange,
  monaco: Monaco
) {
  const suggestions: languages.CompletionItem[] = [
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

  return suggestions;
}

/**
 *
 * @param range
 * @param monaco
 * @returns
 */
export function generateAutocompleteSuggestions(range: IRange, monaco: Monaco) {
  const suggestions: languages.CompletionItem[] = [
    {
      label: {
        label: "Boolean",
        description: "Values with two states, 'True' or 'False'",
      },
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: 'Boolean("")',
      range,
    },
    {
      label: {
        label: "DateTime",
        description: "Date and time in ISO string format",
      },
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "DateTime()",
      range,
    },
    {
      label: {
        label: "Number",
        description: "An integer or decimal number",
      },
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "DateTime()",
      range,
    },
    // {
    //   label: {
    //     label: "Decimal",
    //     detail: "  Number",
    //     description: "A decimal number",
    //   },
    //   kind: monaco.languages.CompletionItemKind.Function,
    //   insertText: "Decimal()",
    //   range,
    // },
    // {
    //   label: {
    //     label: "Int",
    //     detail: "  Integer",
    //     description: "A whole number",
    //   },
    //   kind: monaco.languages.CompletionItemKind.Function,
    //   insertText: "Int()",
    //   range,
    // },
    {
      label: {
        label: "Media",
        description: "Images, videos, PDFs and other files",
      },
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "Media()",
      preselect: true,
      range,
    },
    {
      label: {
        label: "String",
        description: "A long text field of paragraph",
      },
      kind: monaco.languages.CompletionItemKind.Function,
      // documentation: {
      //   value: `This comming from documentation`,
      //   isTrusted: true,
      // },
      insertText: "String()",
      range,
    },

    {
      label: {
        label: "RichText",
        description: "Text formatting with references and media",
      },
      kind: monaco.languages.CompletionItemKind.Field,
      insertText: "RichText()",
      range,
    },
    {
      label: {
        label: "Object",
        description: "Data in JSON format",
      },
      kind: monaco.languages.CompletionItemKind.Field,
      insertText: "RichText()",
      range,
    },
    {
      label: {
        label: "Reference",
        description: "A link to another entry",
      },
      kind: monaco.languages.CompletionItemKind.Field,
      insertText: "Coordinates()",
      range,
    },
    {
      label: {
        label: "Location",
        description: "Coordinates in lat and long.",
      },
      kind: monaco.languages.CompletionItemKind.Field,
      insertText: "Location()",
      range,
    },
  ];

  return suggestions;
}
