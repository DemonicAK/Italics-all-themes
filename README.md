# Italics Support Extension for VS Code

This extension enables italics support for all themes in Visual Studio Code, except for those themes that explicitly mention "(no italics)" in their name.

## Features

- Automatically applies italics to various code elements across all supported themes
- Respects themes that specifically opt out of italics support
- Improves code readability by emphasizing important elements

## Installation

1. Open Visual Studio Code
2. Go to the Extensions view (Ctrl+Shift+X)
3. Search for "Italics Support"
4. Click Install

## Usage

Once installed, the extension will automatically apply italics to supported themes. No additional configuration is required.

### Manual Activation

If you need to manually apply the italics settings:

1. Open the Command Palette (Ctrl+Shift+P)
2. Search for and select "Enable Italics Support"

## Supported Elements

This extension applies italics to the following code elements:

- Emphasis
- Entity attribute names
- Storage types and modifiers
- String interpolation
- Control keywords
- Certain operators
- 'this' and 'self' keywords
- Decorators
- Comments
- Function names
- And more...

## Configuration

The extension works out of the box with no additional configuration. However, if you wish to customize the italics behavior, you can modify the `editor.tokenColorCustomizations` setting in your `settings.json` file.

## Compatibility

This extension is compatible with all VS Code themes, except those that include "(no italics)" in their name. These themes will maintain their original styling without italics.

## Contributing

If you'd like to contribute to this project, please feel free to submit a pull request or open an issue on our GitHub repository.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have suggestions for improvements, please open an issue on our GitHub repository.

Enjoy your enhanced coding experience with italics!