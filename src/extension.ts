import * as vscode from "vscode";

// Italics rules definition
const italicsRules= [
  {
    scope: "emphasis",
    settings: { fontStyle: "italic" },
  },
  {
    scope: "strong",
    settings: { fontStyle: "bold" },
  },
  {
    scope: "entity.other.attribute-name",
    settings: { fontStyle: "italic" },
  },
  {
    scope: "markup.underline",
    settings: { fontStyle: "underline" },
  },
  {
    scope: "markup.bold",
    settings: { fontStyle: "bold" },
  },
  {
    scope: "markup.heading",
    settings: { fontStyle: "italic bold underline" },
  },
  {
    scope: "markup.italic",
    settings: { fontStyle: "italic" },
  },
  {
    scope: "storage.type",
    settings: { fontStyle: "italic" },
  },
  {
    scope: "storage.modifier",
    settings: { fontStyle: "italic" },
  },
  {
    name: "String interpolation",
    scope: [
      "punctuation.definition.template-expression.begin",
      "punctuation.definition.template-expression.end",
      "punctuation.section.embedded",
    ],
    settings: { fontStyle: "italic" },
  },
  {
    scope: "keyword.control",
    settings: { fontStyle: "italic" },
  },
  {
    scope: [
      "keyword.operator.new",
      "keyword.operator.expression",
      "keyword.operator.cast",
      "keyword.operator.sizeof",
      "keyword.operator.logical.python",
    ],
    settings: { fontStyle: "italic" },
  },
  {
    name: "this.self",
    scope: "variable.language",
    settings: {
      fontStyle: "italic",
      foreground: "#ff5874",
    },
  },
  {
    name: "@Decorator",
    scope: ["meta.decorator punctuation.decorator"],
    settings: { fontStyle: "italic" },
  },
  {
    scope: ["punctuation.definition.comment", "comment"],
    settings: { fontStyle: "italic" },
  },
  {
    scope: ["keywords", "variable", "variable.function", "comment"],
    settings: { fontStyle: "italic" },
  },
  {
    scope: ["entity.name.function", "meta.function"],
    settings: { fontStyle: "italic" },
  },
];
let italicsEnabled = true;
// Activates the extension
export function activate(context: vscode.ExtensionContext) {
  console.log("Italics Support Extension is now active");

  // Initialize italics settings on activation
  updateItalicsSettings();

  // Register command for manual italics update
  const disposable = vscode.commands.registerCommand(
    "extension.enableItalics",
    () => {
      updateItalicsSettings();
      vscode.window.showInformationMessage(
        "Italics settings have been updated."
      );
    }
  );

  // Update settings when theme changes
  const themeChangeSubscription = vscode.workspace.onDidChangeConfiguration(
    (event) => {
      if (event.affectsConfiguration("workbench.colorTheme")) {
        updateItalicsSettings();
      }
    }
  );

  // Push subscriptions to context
  context.subscriptions.push(disposable, themeChangeSubscription);
}
function italicscheck(theme: string): boolean {
  if (theme.toLowerCase().includes("(no italics)")) {
    return false;
  }
  return true;
}

// Helper function to get the current color theme
function getCurrentTheme(): string | undefined {
  try {
    return vscode.workspace
      .getConfiguration("workbench")
      .get("colorTheme") as string;
  } catch (error) {
    console.error("Error fetching current theme:", error);
    return undefined;
  }
}
// Function to update italics settings based on the theme
function updateItalicsSettings(): void {
  const config = vscode.workspace.getConfiguration();
  const currentTheme = getCurrentTheme();

  if (!currentTheme) {
    console.error("Unable to retrieve the current theme.");
    return;
  }
  const italicsReq = italicscheck(currentTheme);
  if (italicsEnabled === italicsReq) {
    return;
  }
  // Disable italics if theme has "(no italics)" in its name
  const rules = italicsReq ? [] : italicsRules;

  // Update editor settings
  config.update(
    "editor.tokenColorCustomizations",
    { textMateRules: rules },
    vscode.ConfigurationTarget.Global
  );
   italicsEnabled = italicscheck(currentTheme);
}


// Deactivates the extension
export function deactivate() {
  console.log("Italics Support Extension is now deactivated.");
}
