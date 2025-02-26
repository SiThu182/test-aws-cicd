// ToolbarPlugin.js
import React from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  $createTextNode,
} from "lexical";
import { FORMAT_TEXT_COMMAND } from "lexical";

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();

  const applyStyle = (style) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, style);
      }
    });
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <button onClick={() => applyStyle("bold")}>Bold</button>
      <button onClick={() => applyStyle("italic")}>Italic</button>
      <button onClick={() => applyStyle("underline")}>Underline</button>
    </div>
  );
};

export default ToolbarPlugin;
