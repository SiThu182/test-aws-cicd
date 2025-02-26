import React, { useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

import { $getRoot, $getSelection } from "lexical";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import "./LexicalTextEditor.css";
// Define the initial configuration
const theme = {};
const initialConfig = {
  namespace: "MyEditor",
  theme,
  // theme: {
  //   // Add your custom styles here
  //   paragraph: "my-paragraph-class",
  // },
  onError: (error) => {
    console.error(error);
  },
};

// The editor component
const MyEditor = () => {
  const handleChange = (editorState) => {
    editorState.read(() => {
      const root = $getRoot();
      const selection = $getSelection();
    });
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <PlainTextPlugin
        contentEditable={<ContentEditable className="contentEditable" />}
        placeholder={<div>Enter some text...</div>}
      />
      <ToolbarPlugin />

      <OnChangePlugin onChange={handleChange} />
    </LexicalComposer>
  );
};

export default MyEditor;
