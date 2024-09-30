export const italicsRules = [
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
