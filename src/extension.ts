// // The module 'vscode' contains the VS Code extensibility API
// // Import the module and reference it with the alias vscode in your code below
// import * as vscode from 'vscode';

// // This method is called when your extension is activated
// // Your extension is activated the very first time the command is executed
// export function activate(context: vscode.ExtensionContext) {

// 	// Use the console to output diagnostic information (console.log) and errors (console.error)
// 	// This line of code will only be executed once when your extension is activated
// 	console.log('Congratulations, your extension "italics-all-themes" is now active!');

// 	// The command has been defined in the package.json file
// 	// Now provide the implementation of the command with registerCommand
// 	// The commandId parameter must match the command field in package.json
// 	const disposable = vscode.commands.registerCommand('italics-all-themes.helloWorld', () => {
// 		// The code you place here will be executed every time your command is executed
// 		// Display a message box to the user
// 		vscode.window.showInformationMessage('Hello World from italics-all-themes!');
// 	});

// 	context.subscriptions.push(disposable);
// }

// // This method is called when your extension is deactivated
// export function deactivate() {}


import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("Italics Support Extension is now active");

  // Call the function to update settings when the extension is activated
  updateItalicsSettings();

  // Register a command to manually trigger the update
  let disposable = vscode.commands.registerCommand(
    "extension.enableItalics",
    () => {
      updateItalicsSettings();
      vscode.window.showInformationMessage(
        "Italics settings have been updated"
      );
    }
  );

  context.subscriptions.push(disposable);
}

function updateItalicsSettings() {
  const config = vscode.workspace.getConfiguration();
  const currentTheme = vscode.workspace
    .getConfiguration("workbench")
    .get("colorTheme") as string;

  // Check if the current theme has "(no italics)" in its name
  if (currentTheme.toLowerCase().includes("(no italics)")) {
    console.log("Current theme does not support italics. Skipping...");
    return;
  }

  const italicsRules = [
    // Your provided rules here
 {
        "scope": "emphasis",
        "settings": {
          "fontStyle": "italic"
        }
      },
      {
        "scope": "strong",
        "settings": {
          "fontStyle": "bold"
        }
      },
      {
        "scope": "entity.other.attribute-name",
        "settings": {
          "fontStyle": "italic"
        }
      },
      {
        "scope": "markup.underline",
        "settings": {
          "fontStyle": "underline"
        }
      },
      {
        "scope": "markup.bold",
        "settings": {
          "fontStyle": "bold"
        }
      },
      {
        "scope": "markup.heading",
        "settings": {
          "fontStyle": "italic bold underline"
        }
      },
      {
        "scope": "markup.italic",
        "settings": {
          "fontStyle": "italic"
        }
      },
      {
        "scope": "storage.type",
        "settings": {
          "fontStyle": "italic"
        }
      },
      {
        "scope": "storage.modifier",
        "settings": {
          "fontStyle": "italic"
        }
      },
      {
        "name": "String interpolation",
        "scope": [
          "punctuation.definition.template-expression.begin",
          "punctuation.definition.template-expression.end",
          "punctuation.section.embedded"
        ],
        "settings": {
          "fontStyle": "italic"
        }
      },
      {
        "scope": "keyword.control",
        "settings": {
          "fontStyle": "italic"
        }
      },
      {
        "scope": [
          "keyword.operator.new",
          "keyword.operator.expression",
          "keyword.operator.cast",
          "keyword.operator.sizeof",
          "keyword.operator.logical.python"
        ],
        "settings": {
          "fontStyle": "italic"
        }
      },
      {
        "name": "this.self",
        "scope": "variable.language",
        "settings": {
          "fontStyle": "italic",
          "foreground": "#ff5874"
        }
      },
      {
        "name": "@Decorator",
        "scope": ["meta.decorator punctuation.decorator"],
        "settings": {
          "fontStyle": "italic"
        }
      },
      {
        "scope": ["punctuation.definition.comment", "comment"],
        "settings": {
          // "foreground": "#ff5874",
          "fontStyle": "italic"
        }
      },
      {
        "scope": ["keywords", "variable", "variable.function", "comment"],
        "settings": {
          // "foreground": "#ff5874",
          "fontStyle": "italic"
        }
      },
      {
        // "scope": [],
        "scope": ["entity.name.function", "meta.function"],
        "settings": {
          // "foreground": "#ff5874",
          "fontStyle": "italic"
        }
      }
    
    // ... (include all the rules from your snippet)
  ];

  // Update the settings
  config.update(
    "editor.tokenColorCustomizations",
    {
      textMateRules: italicsRules,
    },
    vscode.ConfigurationTarget.Global
  );
}

export function deactivate() {}