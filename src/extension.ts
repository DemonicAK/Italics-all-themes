import * as vscode from "vscode";
import { italicsRules } from "./italicsRules";

export function activate(context: vscode.ExtensionContext) {
  console.log("Italics Support Extension is now active");

  // Initialize italics settings on activation
  updateItalicsSettings();

  // Register command for manual italics update
  const disposable = vscode.commands.registerCommand(
    "extension.updateItalics",
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

function shouldApplyItalics(theme: string): boolean {
  return !theme.toLowerCase().includes("(no italics)");
}

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

function updateItalicsSettings(): void {
  const config = vscode.workspace.getConfiguration();
  const currentTheme = getCurrentTheme();

  if (!currentTheme) {
    console.error("Unable to retrieve the current theme.");
    return;
  }

  const applyItalics = shouldApplyItalics(currentTheme);

  // Apply italics rules if the theme doesn't include "(no italics)"
  const rules = applyItalics ? italicsRules : [];

  // Update editor settings
  config.update(
    "editor.tokenColorCustomizations",
    { textMateRules: rules },
    vscode.ConfigurationTarget.Global
  );

  console.log(
    `Italics ${
      applyItalics ? "applied" : "not applied"
    } for theme: ${currentTheme}`
  );
}

export function deactivate() {
  console.log("Italics Support Extension is now deactivated.");
}
