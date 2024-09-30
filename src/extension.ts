import * as vscode from 'vscode';

let decorationType: vscode.TextEditorDecorationType | undefined;

export function activate(context: vscode.ExtensionContext) {
  console.log('Italics Support Extension is now active');

  // Apply italics dynamically on activation
  updateItalicsForActiveEditors();

  // Listen for theme changes
  const themeChangeSubscription = vscode.workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration('workbench.colorTheme')) {
      updateItalicsForActiveEditors();
    }
  });

  // Apply italics to newly opened editors
  const editorOpenSubscription = vscode.window.onDidChangeActiveTextEditor(() => {
    updateItalicsForActiveEditors();
  });

  context.subscriptions.push(themeChangeSubscription, editorOpenSubscription);
}

function shouldApplyItalics(theme: string): boolean {
  return !theme.toLowerCase().includes('(no italics)');
}

function getCurrentTheme(): string | undefined {
  try {
    return vscode.workspace.getConfiguration('workbench').get('colorTheme') as string;
  } catch (error) {
    console.error('Error fetching current theme:', error);
    return undefined;
  }
}

function updateItalicsForActiveEditors(): void {
  const currentTheme = getCurrentTheme();
  
  if (!currentTheme) {
    console.error('Unable to retrieve the current theme.');
    return;
  }

  // Dispose of existing decoration if it exists
  if (decorationType) {
    decorationType.dispose();
  }

  const applyItalics = shouldApplyItalics(currentTheme);

  if (applyItalics) {
    decorationType = vscode.window.createTextEditorDecorationType({
      fontStyle: 'italic',
    });

    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
      // Apply decorations to the entire document
      const range = new vscode.Range(0, 0, activeEditor.document.lineCount, 0);
      activeEditor.setDecorations(decorationType, [range]);
    }
  } else {
    console.log('Italics not applied for theme:', currentTheme);
  }
}

export function deactivate() {
  // Clean up the decoration type if it exists
  if (decorationType) {
    decorationType.dispose();
  }
}
