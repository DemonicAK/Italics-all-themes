import * as vscode from "vscode";

let italicDecorationType: vscode.TextEditorDecorationType;

// Define the token types we want to italicize
const italicizedTokenTypes = new Set([
  "variable",
  "variable.other",
  "variable.parameter",
  "variable.language",
  "variable.name",
  "entity.name.function",
  "entity.name.type",
  "entity.other.inherited-class",
  "keyword",
  "storage.type",
  "storage.modifier",
  "constant",
  "constant.numeric",
  "constant.language",
  "string",
]);

// Define the TokenInformation interface
interface TokenInformation {
  range: vscode.Range;
  tokenType: string;
}



async function getTokensAtPosition(
  document: vscode.TextDocument,
  position: vscode.Position
): Promise<TokenInformation[]> {
  const tokens = await vscode.commands.executeCommand<vscode.SemanticTokens>(
    "vscode.executeDocumentRangeSemanticTokensProvider",
    document.uri,
    document.lineAt(position).range
  );

  if (tokens) {
    const legend =
      await vscode.commands.executeCommand<vscode.SemanticTokensLegend>(
        "vscode.provideDocumentSemanticTokensLegend",
        document.uri
      );

    const tokenInfos: TokenInformation[] = [];
    for (let i = 0; i < tokens.data.length; i += 5) {
      const line = tokens.data[i];
      const startChar = tokens.data[i + 1];
      const length = tokens.data[i + 2];
      const typeIndex = tokens.data[i + 3];
      const tokenType = legend
        ? legend.tokenTypes[typeIndex]
        : `token_${typeIndex}`;
      tokenInfos.push({
        range: new vscode.Range(line, startChar, line, startChar + length),
        tokenType: tokenType,
      });
    }
    return tokenInfos;
  } else {
    return [];
  }
}

async function updateDecorations(editor: vscode.TextEditor) {
  const document = editor.document;
  const decorations: vscode.DecorationOptions[] = [];

  for (let lineIndex = 0; lineIndex < document.lineCount; lineIndex++) {
    const line = document.lineAt(lineIndex);
    const tokens = await getTokensAtPosition(document, line.range.start);

    for (const token of tokens) {
      if (italicizedTokenTypes.has(token.tokenType)) {
        decorations.push({ range: token.range });
      }
    }
  }

  editor.setDecorations(italicDecorationType, decorations);
}

export function activate(context: vscode.ExtensionContext) {
  console.log("Italics support extension is now active");

  italicDecorationType = vscode.window.createTextEditorDecorationType({
    fontStyle: "italic",
  });

  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor((editor) => {
      if (editor) {
        updateDecorations(editor);
      }
    }),

    vscode.workspace.onDidChangeTextDocument((event) => {
      if (
        vscode.window.activeTextEditor &&
        event.document === vscode.window.activeTextEditor.document
      ) {
        updateDecorations(vscode.window.activeTextEditor);
      }
    })
  );

  if (vscode.window.activeTextEditor) {
    updateDecorations(vscode.window.activeTextEditor);
  }
}

export function deactivate() {
  if (italicDecorationType) {
    italicDecorationType.dispose();
  }
}
