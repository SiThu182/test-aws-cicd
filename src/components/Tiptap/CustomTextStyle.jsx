import { Extension } from "@tiptap/core";

export const CustomTextStyle = Extension.create({
  name: "customTextStyle",

  addAttributes() {
    return {
      style: {
        default: "",
        parseHTML: (element) => {
          return { style: element.style.cssText };
        },
        renderHTML: (attributes) => {
          return { style: attributes.style || "" };
        },
      },
    };
  },

  addCommands() {
    return {
      setTextStyle:
        (style) =>
        ({ commands }) => {
          return commands.updateAttributes("textStyle", { style });
        },
    };
  },
});
