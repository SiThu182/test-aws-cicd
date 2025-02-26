import React, { useMemo } from "react";
import { generateHTML } from "@tiptap/html";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Heading from "@tiptap/extension-heading";

import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Blockquote from "@tiptap/extension-blockquote";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";

import FontFamily from "@tiptap/extension-font-family";
import Link from "@tiptap/extension-link";
//import Typography from "@tiptap/extension-typography";
import YouTube from "@tiptap/extension-youtube"; // Import YouTube extension
import Image from "@tiptap/extension-image";
// Create the React component to render HTML
const JsonToHtml = (jsonData) => {
  const output = useMemo(() => {
    try {
      return generateHTML(jsonData?.jsonData, [
        Document,
        Paragraph,
        Heading,
        Text,
        Bold,
        Image,
        YouTube,
        Underline,
        Strike,
        Blockquote,
        Color,
        TextStyle,
        TextAlign,
        FontFamily,
        Link,

        // Typography,
        // Add other extensions as needed
      ]);
    } catch (error) {
      console.error("Error generating HTML:", error);
      return "";
    }
  }, [jsonData]);

  return <div dangerouslySetInnerHTML={{ __html: output }} />;
};

export default JsonToHtml;
